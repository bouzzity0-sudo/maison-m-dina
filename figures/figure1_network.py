"""
Figure 1 — Graphe cyber-nucléaire — ITERATION 4 (correction complète)

Corrections appliquées :
- FSB Centre 16 → Centre 18 (Unit 71330, DOJ 2022)
- APT10 et Volt Typhoon séparés (deux acteurs distincts)
- Lazarus et Kimsuky séparés (deux acteurs DPRK distincts)
- GCHQ reclassifié défenseur (aucune op offensive nucleaire documentée)
- TRITON→EDF supprimé (TRITON = Arabie Saoudite, pas France)
- NITRO ZEUS recadré (plan contre Iran, arête NSA→EDF supprimée)
- Ajout COMCYBER + DGA-MI (piliers LIO France)
- LIO = interministériel (pas exclusivement DGSE)
- EDF / Framatome / Orano nœuds distincts
- Système de confiance sur les arêtes (3 niveaux)
- Fonds de clusters nationaux (Russie, Chine, DPRK, Iran)
- KillNet = "contractor étatique" (nuance 2023)
"""
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import matplotlib.lines as mlines
import matplotlib.patheffects as pe
import networkx as nx
from matplotlib.patches import Ellipse

BG_COLOR = '#F9F6EF'
FONT     = 'P052'

# ─── PALETTE ───
COLORS = {
    'offensif':    '#8B0000',
    'proxy':       '#BF5700',
    'ambivalent':  '#5B2C8D',
    'défenseur':   '#1B5E20',
    'normatif':    '#1A237E',
    'opérateur':   '#546E7A',
}

NATION_BG = {
    'russia': ('#FDECEA', '#C62828', 'Russie'),
    'china':  ('#FFF8E1', '#F57F17', 'Chine'),
    'dprk':   ('#FCE4EC', '#880E4F', 'RPDC'),
    'iran':   ('#FFF3E0', '#E65100', 'Iran'),
}

# ─── NIVEAUX DE CONFIANCE DES ARÊTES ───
# HIGH : source primaire judiciaire / gouvernementale
# MED  : rapports TI multiple, attribution probable
# LOW  : capacité démontrée / inféré / non confirmé FR
CONF_STYLE = {
    'offensive-HIGH': dict(color='#C62828', ls='-',  lw=2.6, alpha=0.90),
    'offensive-MED':  dict(color='#C62828', ls='--', lw=1.8, alpha=0.78),
    'offensive-LOW':  dict(color='#E57373', ls=':',  lw=1.3, alpha=0.65),
    'proxy-HIGH':     dict(color='#E65100', ls='-',  lw=2.0, alpha=0.88),
    'proxy-MED':      dict(color='#E65100', ls='--', lw=1.5, alpha=0.75),
    'défensive-HIGH': dict(color='#2E7D32', ls='-',  lw=2.2, alpha=0.88),
    'défensive-MED':  dict(color='#2E7D32', ls='--', lw=1.6, alpha=0.75),
    'tension-MED':    dict(color='#607D8B', ls=':',  lw=1.4, alpha=0.72),
}

# ─── NŒUDS ───
NODES = [
    # Russie — état
    ('FSB_C18',     'FSB Centre 18\n(Unit 71330)',      'offensif',   9),
    ('GRU_SW',      'GRU Sandworm\n(Unit 74455)',       'offensif',   9),
    # Russie — proxy/contractor
    ('KillNet',     'KillNet\n(contractor étatique)',   'proxy',      6),
    ('TEMP_V',      'TEMP.Veles\n(CNIIHM)',             'proxy',      8),
    # Chine — deux acteurs distincts
    ('APT10',       'APT10\n(Stone Panda / MSS)',       'offensif',   7),
    ('VoltT',       'Volt Typhoon\n(Bronze Silhouette)','offensif',   8),
    # RPDC — deux acteurs distincts
    ('Lazarus',     'Lazarus Group\n(RGB / Bureau 121)','offensif',   8),
    ('Kimsuky',     'Kimsuky\n(RGB / Unité 180)',       'offensif',   7),
    # Iran
    ('APT33',       'APT33\n(IRGC-MOIS)',              'offensif',   7),
    # Ambivalents
    ('NSA_CIA',     'NSA / CIA\n(USA)',                 'ambivalent', 10),
    ('Unit8200',    'Unit 8200\n(AMAN, Israël)',        'ambivalent',  8),
    ('DGSE_LIO',    'DGSE\n(LIO France)',               'ambivalent',  7),
    # Défenseurs
    ('ANSSI',       'ANSSI /\nCERT-FR',                'défenseur',   8),
    ('COMCYBER',    'COMCYBER\n(France)',               'défenseur',   8),
    ('DGA_MI',      'DGA-MI\n(Rennes)',                'défenseur',   6),
    ('CISA',        'CISA / FBI\n(USA)',                'défenseur',   9),
    ('GCHQ',        'GCHQ\n(UK)',                      'défenseur',   7),
    ('FiveEyes',    'Five Eyes',                       'défenseur',   9),
    # Normatif
    ('AIEA',        'AIEA',                            'normatif',    7),
    # Opérateurs FR — nœuds distincts
    ('EDF',         'EDF\n(exploitation)',             'opérateur',   7),
    ('Framatome',   'Framatome\n(équipements)',        'opérateur',   6),
    ('Orano',       'Orano\n(cycle combustible)',      'opérateur',   6),
    # Cible auxiliaire (pour recadrer TRITON géographiquement)
    ('SIS_SA',      'SIS industriels\n(cible Arabie\nSaoudite)',  'opérateur', 5),
]

NODE_IDS    = [n[0] for n in NODES]
LABELS      = {n[0]: n[1] for n in NODES}
CATEGORIES  = {n[0]: n[2] for n in NODES}
INTENSITIES = {n[0]: n[3] for n in NODES}
NODE_SIZES  = {nid: 320 + INTENSITIES[nid]**2 * 26 for nid in NODE_IDS}

# ─── POSITIONS ───
POS = {
    # Russie cluster (haut-gauche)
    'FSB_C18':   (-5.4,  3.0),
    'GRU_SW':    (-5.4,  1.6),
    'KillNet':   (-3.6,  4.0),
    'TEMP_V':    (-3.6,  2.6),
    # Chine cluster (gauche-milieu)
    'APT10':     (-5.2,  0.0),
    'VoltT':     (-5.2, -1.4),
    # RPDC cluster (bas-gauche)
    'Lazarus':   (-4.2, -2.8),
    'Kimsuky':   (-4.2, -4.0),
    # Iran (extrême bas-gauche)
    'APT33':     (-2.8, -5.2),
    # Ambivalents (haut-centre)
    'NSA_CIA':   ( 0.0,  4.4),
    'Unit8200':  ( 1.6,  3.4),
    'DGSE_LIO':  (-0.6,  3.0),
    # Défenseurs (droite)
    'ANSSI':     ( 3.2,  0.8),
    'COMCYBER':  ( 3.2, -0.6),
    'DGA_MI':    ( 3.2, -2.0),
    'CISA':      ( 4.8,  1.8),
    'GCHQ':      ( 4.8,  3.2),
    'FiveEyes':  ( 4.8,  4.4),
    # Normatif
    'AIEA':      ( 0.4, -1.6),
    # Opérateurs FR (bas-centre)
    'EDF':       (-0.2, -4.6),
    'Framatome': ( 1.2, -4.0),
    'Orano':     (-1.6, -4.0),
    # Cible auxiliaire (bas-droite)
    'SIS_SA':    ( 2.2, -4.8),
}

# ─── OFFSETS LABELS ───
# Sens de placement : 'L'=gauche, 'R'=droite, 'U'=haut, 'D'=bas
LABEL_DIR = {
    'FSB_C18':'L','GRU_SW':'L','KillNet':'L','TEMP_V':'L',
    'APT10':'L','VoltT':'L',
    'Lazarus':'L','Kimsuky':'L',
    'APT33':'L',
    'NSA_CIA':'U','Unit8200':'U','DGSE_LIO':'U',
    'ANSSI':'R','COMCYBER':'R','DGA_MI':'R',
    'CISA':'R','GCHQ':'R','FiveEyes':'R',
    'AIEA':'U',
    'EDF':'D','Framatome':'D','Orano':'D',
    'SIS_SA':'D',
}
OFFSETS_MAP = {'L':(-1.1, 0.0),'R':(1.1, 0.0),'U':(0.0, 0.68),'D':(0.0, -0.68)}
HA_MAP = {'L':'right','R':'left','U':'center','D':'center'}
VA_MAP = {'L':'center','R':'center','U':'bottom','D':'top'}

# ─── ARÊTES ───
# (src, dst, type_base, niveau_confiance, note_label)
EDGES = [
    # Offensif → opérateurs FR
    ('FSB_C18',   'EDF',       'offensive', 'HIGH', 'HAVEX 2014\nWolf Creek 2017\n[DOJ Akulov 2022]'),
    ('GRU_SW',    'EDF',       'offensive', 'LOW',  'Capacité Industroyer\n[Ukraine; pas FR documenté]'),
    ('VoltT',     'EDF',       'offensive', 'MED',  'Infra critique OT\n[CISA AA23-144A/AA24-038A]'),
    ('APT10',     'Framatome', 'offensive', 'MED',  'Espionnage IP\n[NCSC/DoJ 2018]'),
    ('Lazarus',   'EDF',       'offensive', 'MED',  'Secteur énergie\n[CISA AA22-011A]'),
    ('Kimsuky',   'Orano',     'offensive', 'MED',  'Espionnage enrichissement\n[HHS/DHS 2020]'),
    ('APT33',     'EDF',       'offensive', 'MED',  'Secteur énergie\n[CISA AA23-144A]'),
    # TRITON → cible Arabie Saoudite (corrigé)
    ('TEMP_V',    'SIS_SA',    'offensive', 'HIGH', 'TRITON/TRISIS 2017\n[Dragos; Arabie Saoudite]'),
    # Proxy
    ('KillNet',   'EDF',       'proxy',     'HIGH', 'DDoS pro-russes\n[Mandiant 2022]'),
    ('KillNet',   'FSB_C18',   'proxy',     'MED',  'Liens Kremlin\n[Mandiant/CERT-EU 2022-23]'),
    ('TEMP_V',    'GRU_SW',    'proxy',     'MED',  'Attribution GRU/CNIIHM\n[Dragos XENOTIME]'),
    # Ambivalents — opérations offensives documentées
    ('NSA_CIA',   'Unit8200',  'offensive', 'HIGH', 'Stuxnet / Natanz\n[Zetter 2014]'),
    # Ambivalents — coordination défensive
    ('DGSE_LIO',  'ANSSI',     'défensive', 'MED',  'Coordination SGDSN\n[interministériel]'),
    ('NSA_CIA',   'CISA',      'défensive', 'HIGH', 'NSA/CISA MOU\n[partage menace]'),
    # Défenseurs
    ('CISA',      'EDF',       'défensive', 'HIGH', 'Advisories publics\n[AA22-083A, AA23-144A]'),
    ('ANSSI',     'EDF',       'défensive', 'HIGH', 'Qualification OIV\n[LPM 2013 art.22]'),
    ('ANSSI',     'Framatome', 'défensive', 'MED',  'Qualification OIV'),
    ('ANSSI',     'Orano',     'défensive', 'MED',  'Qualification OIV'),
    ('COMCYBER',  'ANSSI',     'défensive', 'MED',  'Coordination\ncyber-défense\n[SGDSN 2018]'),
    ('DGA_MI',    'COMCYBER',  'défensive', 'HIGH', 'R&D LIO / outillage\n[DGA Rennes]'),
    ('FiveEyes',  'CISA',      'défensive', 'HIGH', 'UKUSA Agreement\n[partage rens.]'),
    ('FiveEyes',  'GCHQ',      'défensive', 'HIGH', 'UKUSA Agreement'),
    # Normatif
    ('AIEA',      'EDF',       'tension',   'MED',  'INFCIRC/225 Rev.5\n[non contraignant]'),
    ('AIEA',      'ANSSI',     'défensive', 'MED',  'Coopération\nnormative'),
]

# ─── GRAPHE ───
G = nx.DiGraph()
for nid in NODE_IDS: G.add_node(nid)
for (s, d, t, c, _) in EDGES: G.add_edge(s, d, etype=t, conf=c)

# ─── FIGURE ───
fig, ax = plt.subplots(figsize=(28, 20))
fig.patch.set_facecolor(BG_COLOR)
ax.set_facecolor(BG_COLOR)

# ─── FONDS NATION CLUSTERS ───
clusters = {
    'russia': dict(xy=(-4.6, 2.8), w=4.4, h=3.4, angle=15,
                   fc='#FDECEA', ec='#C62828', lbl='Russie', lbl_xy=(-6.4, 4.5)),
    'china':  dict(xy=(-5.2, -0.7), w=2.8, h=2.6, angle=5,
                   fc='#FFF8E1', ec='#F9A825', lbl='Chine', lbl_xy=(-6.2,  0.8)),
    'dprk':   dict(xy=(-4.4, -3.4), w=2.8, h=2.4, angle=0,
                   fc='#FCE4EC', ec='#880E4F', lbl='RPDC',  lbl_xy=(-5.7, -2.1)),
    'iran':   dict(xy=(-2.8, -5.4), w=2.2, h=1.2, angle=0,
                   fc='#FFF3E0', ec='#E65100', lbl='Iran',  lbl_xy=(-3.8, -5.0)),
}
for key, c in clusters.items():
    ell = Ellipse(xy=c['xy'], width=c['w'], height=c['h'], angle=c['angle'],
                  facecolor=c['fc'], edgecolor=c['ec'], alpha=0.55,
                  linewidth=1.5, linestyle='--', zorder=1)
    ax.add_patch(ell)
    ax.text(c['lbl_xy'][0], c['lbl_xy'][1], c['lbl'],
            fontsize=9, fontfamily=FONT, color=c['ec'],
            fontweight='bold', style='italic', alpha=0.7, zorder=2)

# Zone fond défenseur
ax.axvspan(2.0, 6.2, color='#E8F5E9', alpha=0.22, zorder=0)
ax.axvspan(-1.2, 2.0, color='#F3E5FF', alpha=0.12, zorder=0)  # ambivalent

# ─── ARÊTES ───
edge_labels_drawn = {}
for (src, dst, btype, conf, note) in EDGES:
    key = f'{btype}-{conf}'
    s = CONF_STYLE.get(key, CONF_STYLE.get(f'{btype}-MED',
        dict(color='#888877', ls=':', lw=1.2, alpha=0.6)))
    xS, yS = POS[src]; xD, yD = POS[dst]
    has_rev = G.has_edge(dst, src)
    rad = 0.12 if has_rev else 0.0
    ax.annotate('', xy=(xD, yD), xytext=(xS, yS),
        arrowprops=dict(arrowstyle='->', color=s['color'], lw=s['lw'],
                        alpha=s['alpha'], linestyle=s['ls'],
                        connectionstyle=f'arc3,rad={rad}',
                        shrinkA=16, shrinkB=16), zorder=3)

# ─── NŒUDS ───
for nid in NODE_IDS:
    x, y = POS[nid]
    ax.scatter(x, y, s=NODE_SIZES[nid], color=COLORS[CATEGORIES[nid]],
               alpha=0.92, edgecolors='white', linewidths=2.0, zorder=5)

# ─── LABELS DIRECTIONNELS ───
for nid in NODE_IDS:
    x, y = POS[nid]
    d = LABEL_DIR[nid]
    dx, dy = OFFSETS_MAP[d]
    lx, ly = x + dx, y + dy
    clr = COLORS[CATEGORIES[nid]]
    ax.text(lx, ly, LABELS[nid],
            ha=HA_MAP[d], va=VA_MAP[d],
            fontsize=7.6, fontfamily=FONT, fontweight='bold',
            color='white', multialignment='center', linespacing=1.2, zorder=8,
            bbox=dict(boxstyle='round,pad=0.26', facecolor=clr,
                      alpha=0.91, edgecolor='white', linewidth=0.9))

# ─── ANNOTATIONS INTERMINISTÉRIEL LIO ───
ax.annotate('LIO = compétence\ninterministérielle\n(DGSE + COMCYBER\n+ DGSI + SGDSN)',
    xy=(3.2, -0.6), xytext=(1.4, 1.6),
    fontsize=7, fontfamily=FONT, style='italic', color='#5B2C8D',
    arrowprops=dict(arrowstyle='-', color='#5B2C8D', lw=0.8, alpha=0.6),
    bbox=dict(boxstyle='round,pad=0.2', facecolor='#F3E5FF', alpha=0.8, edgecolor='#5B2C8D'),
    zorder=9)

# Annotation TRITON (Arabie Saoudite)
ax.text(3.0, -5.2, 'Note : TRITON/TRISIS (2017) = cible Arabie Saoudite\n'
        '(Petro Rabigh). Aucune opération TEMP.Veles contre\nopérateurs nucléaires FR documentée.',
        ha='center', fontsize=7, fontfamily=FONT, style='italic', color='#BF5700',
        bbox=dict(boxstyle='round,pad=0.3', facecolor='#FFF3E0', alpha=0.85,
                  edgecolor='#BF5700', linewidth=0.8), zorder=9)

# ─── LÉGENDES ───
leg_nodes = [
    mpatches.Patch(facecolor=COLORS['offensif'],   label='Acteur offensif hostile'),
    mpatches.Patch(facecolor=COLORS['proxy'],      label='Proxy / contractor étatique'),
    mpatches.Patch(facecolor=COLORS['ambivalent'], label='Ambivalent (offensif & défenseur)'),
    mpatches.Patch(facecolor=COLORS['défenseur'],  label='Défenseur institutionnel'),
    mpatches.Patch(facecolor=COLORS['normatif'],   label='Acteur normatif international'),
    mpatches.Patch(facecolor=COLORS['opérateur'],  label='Opérateur / cible civile'),
]
leg_conf = [
    mlines.Line2D([], [], color='#555', lw=2.6, ls='-',  label='Confiance élevée (source judiciaire/gouvern.)'),
    mlines.Line2D([], [], color='#555', lw=1.8, ls='--', label='Confiance modérée (rapports TI multiples)'),
    mlines.Line2D([], [], color='#AAA', lw=1.3, ls=':',  label='Confiance basse (capacité / inféré)'),
]
leg_types = [
    mlines.Line2D([], [], color='#C62828', lw=2.2, ls='-',  marker='>', ms=8,
                  label='Opération offensive'),
    mlines.Line2D([], [], color='#E65100', lw=1.8, ls='-',  marker='>', ms=8,
                  label='Proxy / contractor'),
    mlines.Line2D([], [], color='#2E7D32', lw=2.0, ls='-',  marker='>', ms=8,
                  label='Coordination défensive'),
    mlines.Line2D([], [], color='#607D8B', lw=1.4, ls=':',  marker='>', ms=8,
                  label='Tension / normative'),
]
l1 = ax.legend(handles=leg_nodes, title="Catégorie d'acteur",
    title_fontsize=9, fontsize=8.5, loc='upper left', bbox_to_anchor=(0.0, 1.0),
    framealpha=0.94, edgecolor='#CCCCBB', facecolor='#FDFAF4',
    borderpad=0.9, labelspacing=0.5, prop={'family': FONT})
l1.get_title().set_fontfamily(FONT); ax.add_artist(l1)

l2 = ax.legend(handles=leg_conf, title='Niveau de confiance',
    title_fontsize=9, fontsize=8.5, loc='lower left', bbox_to_anchor=(0.0, 0.0),
    framealpha=0.94, edgecolor='#CCCCBB', facecolor='#FDFAF4',
    borderpad=0.9, labelspacing=0.5, prop={'family': FONT})
l2.get_title().set_fontfamily(FONT); ax.add_artist(l2)

l3 = ax.legend(handles=leg_types, title='Type de relation',
    title_fontsize=9, fontsize=8.5, loc='lower right', bbox_to_anchor=(1.0, 0.0),
    framealpha=0.94, edgecolor='#CCCCBB', facecolor='#FDFAF4',
    borderpad=0.9, labelspacing=0.5, prop={'family': FONT})
l3.get_title().set_fontfamily(FONT); ax.add_artist(l3)

for intensity, lbl in [(5, 'Intensité 5'), (9, 'Intensité 9')]:
    ax.scatter([], [], s=320+intensity**2*26, color='#888877', alpha=0.75, label=lbl)
l4 = ax.legend(title='Taille = intensité documentée',
    title_fontsize=9, fontsize=8.5, loc='upper right', bbox_to_anchor=(1.0, 1.0),
    framealpha=0.94, edgecolor='#CCCCBB', facecolor='#FDFAF4',
    borderpad=0.9, scatterpoints=1, prop={'family': FONT})
l4.get_title().set_fontfamily(FONT)

# ─── TITRE ───
ax.set_title("Cartographie des acteurs dans l'espace cyber-nucléaire civil",
    fontsize=18, fontfamily=FONT, fontweight='bold', color='#1A1A1A', pad=16)
fig.text(0.5, 0.945, 'Relations documentées, 2010–2026 | Correction itération 4',
    ha='center', fontsize=11, fontfamily=FONT, style='italic', color='#444433')
fig.text(0.5, 0.006,
    'Sources : DOJ Akulov Indictment 2022 (FSB C18, HAVEX/Wolf Creek) — DOJ Gladkikh 2022 (CNIIHM, TRITON/Arabie Saoudite) — '
    'ESET/CERT-UA (Industroyer, Ukraine) — Dragos XENOTIME 2017 (TRITON) — CISA AA23-144A, AA24-038A (Volt Typhoon OT) — '
    'NCSC/DoJ 2018 (APT10) — Zetter K. (2014) (Stuxnet/Natanz) — Mandiant/CERT-EU 2022-23 (KillNet contractor) — '
    'CISA AA22-011A (Lazarus secteur énergie) — LPM 2013 art.22 — AIEA INFCIRC/225 Rev.5 — UKUSA Agreement.',
    ha='center', fontsize=7.0, fontfamily=FONT, style='italic', color='#555544')

ax.axis('off')
ax.set_xlim(-7.0, 6.8)
ax.set_ylim(-6.4, 5.8)
plt.tight_layout(rect=[0, 0.04, 1, 0.94])
fig.savefig('/home/user/maison-m-dina/figures/figure1_network.png', dpi=300, bbox_inches='tight', facecolor=BG_COLOR)
fig.savefig('/home/user/maison-m-dina/figures/figure1_network.svg', format='svg', bbox_inches='tight', facecolor=BG_COLOR)
print("Figure 1 — OK (itération 4)")
plt.close()
