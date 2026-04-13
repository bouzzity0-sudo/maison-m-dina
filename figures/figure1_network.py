"""
Figure 1 — Graphe de rivalités acteurs cyber-nucléaire
Thèse IFG — Géopolitique du nucléaire civil
Standard publication : 300 DPI, typographie académique
"""
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import matplotlib.lines as mlines
import matplotlib.patheffects as pe
import networkx as nx
from adjustText import adjust_text

# ─────────────────────────────────────────────
# 1. CONFIGURATION TYPOGRAPHIQUE & COULEURS
# ─────────────────────────────────────────────
BG_COLOR   = '#F9F6EF'
GRID_COLOR = '#E8E4DA'

COLORS = {
    'offensif':    '#8B0000',   # rouge foncé
    'proxy':       '#D4720A',   # orange
    'ambivalent':  '#5B2C8D',   # violet
    'défenseur':   '#1B5E20',   # vert foncé
    'normatif':    '#1A237E',   # bleu marine
    'opérateur':   '#37474F',   # gris foncé
}

EDGE_STYLES = {
    'offensive':  dict(color='#C62828', style='-',  width=2.0, alpha=0.85),
    'proxy':      dict(color='#E65100', style='--', width=1.6, alpha=0.80),
    'défensive':  dict(color='#2E7D32', style='-',  width=1.8, alpha=0.80),
    'tension':    dict(color='#546E7A', style=':',  width=1.4, alpha=0.75),
}

# ─────────────────────────────────────────────
# 2. DÉFINITION DES NŒUDS
# ─────────────────────────────────────────────
# (id, label_display, catégorie, intensité_documentée 1-10)
NODES = [
    # Offensifs
    ('FSB_C16',      'FSB\nCentre 16',         'offensif',   9),
    ('GRU_SW',       'GRU\nSandworm',           'offensif',   9),
    ('Lazarus',      'Lazarus /\nKimsuky',       'offensif',   8),
    ('APT33',        'APT33\n(Iran)',            'offensif',   7),
    ('MSS_APT10',    'MSS APT10 /\nVolt Typhoon','offensif',   8),
    # Proxy / criminel
    ('KillNet',      'KillNet',                 'proxy',      5),
    ('TEMP_Veles',   'TEMP.Veles\n(XENOTIME)',   'proxy',      7),
    # Ambivalents
    ('NSA_CIA',      'NSA / CIA',               'ambivalent', 10),
    ('Unit8200',     'Unit 8200\n(Israël)',      'ambivalent',  8),
    ('GCHQ',         'GCHQ\n(UK)',              'ambivalent',  7),
    ('DGSE_LIO',     'DGSE / LIO\n(France)',    'ambivalent',  6),
    # Défenseurs
    ('ANSSI',        'ANSSI /\nCERT-FR',        'défenseur',   8),
    ('CISA',         'CISA / NSA\ndéfensif',    'défenseur',   9),
    ('FiveEyes',     'Five Eyes\n(coalition)',   'défenseur',   9),
    # Normatif
    ('AIEA',         'AIEA',                    'normatif',    7),
    # Opérateur
    ('EDF_op',       'EDF / Framatome\n/ Orano','opérateur',   6),
]

NODE_IDS    = [n[0] for n in NODES]
LABELS      = {n[0]: n[1] for n in NODES}
CATEGORIES  = {n[0]: n[2] for n in NODES}
INTENSITIES = {n[0]: n[3] for n in NODES}
NODE_COLORS = [COLORS[CATEGORIES[nid]] for nid in NODE_IDS]
NODE_SIZES  = [180 + INTENSITIES[nid] ** 2 * 18 for nid in NODE_IDS]

# ─────────────────────────────────────────────
# 3. DÉFINITION DES ARÊTES (source, cible, type, source_doc)
# ─────────────────────────────────────────────
EDGES = [
    ('FSB_C16',   'EDF_op',    'offensive', 'DOJ Akulov 2022\n(HAVEX 2014, Wolf Creek 2017)'),
    ('GRU_SW',    'EDF_op',    'offensive', 'ESET/CERT-UA\n(Industroyer)'),
    ('TEMP_Veles','EDF_op',    'offensive', 'Dragos XENOTIME\n(TRITON 2017)'),
    ('MSS_APT10', 'EDF_op',    'offensive', 'CISA AA24-038A\n(Volt Typhoon OT)'),
    ('KillNet',   'EDF_op',    'proxy',     'Mandiant 2022\n(DDoS pro-russes)'),
    ('KillNet',   'FSB_C16',   'proxy',     'Mandiant 2022\n(lien Kremlin)'),
    ('TEMP_Veles','GRU_SW',    'proxy',     'Dragos XENOTIME\n(attribution GRU)'),
    ('NSA_CIA',   'Unit8200',  'offensive', 'Zetter 2014\n(Stuxnet / Natanz)'),
    ('NSA_CIA',   'EDF_op',    'tension',   'NYT/Sanger 2016\n(NITRO ZEUS)'),
    ('CISA',      'EDF_op',    'défensive', 'AA22-083A / AA23-144A\n(attribution publique)'),
    ('ANSSI',     'EDF_op',    'défensive', 'LPM 2013 art.22\n(qualification OIV)'),
    ('FiveEyes',  'CISA',      'défensive', 'UKUSA Agreement\n(partage rens.)'),
    ('FiveEyes',  'GCHQ',      'défensive', 'UKUSA Agreement'),
    ('AIEA',      'EDF_op',    'tension',   'INFCIRC/225\n(normes non contraignantes)'),
    ('AIEA',      'ANSSI',     'défensive', 'INFCIRC/225\n(coopération normative)'),
    ('APT33',     'EDF_op',    'offensive', 'DOE/CISA 2023\n(infra nucléaire)'),
    ('Lazarus',   'EDF_op',    'offensive', 'CISA AA22-011A\n(secteur énergie)'),
    ('DGSE_LIO',  'ANSSI',     'défensive', 'SGDSN\n(coordination nationale)'),
    ('NSA_CIA',   'CISA',      'défensive', 'NSA/CISA MOU\n(partage menace)'),
    ('APT33',     'MSS_APT10', 'tension',   'CrowdStrike 2023\n(rivalité opérationnelle)'),
]

# ─────────────────────────────────────────────
# 4. POSITIONS MANUELLES (évite les chevauchements)
# ─────────────────────────────────────────────
# Quadrant offensif à gauche, défenseurs à droite, normatif/opérateur au centre-bas
POS = {
    'FSB_C16':   (-3.8,  1.8),
    'GRU_SW':    (-3.8,  0.4),
    'Lazarus':   (-3.2, -1.0),
    'APT33':     (-3.0, -2.4),
    'MSS_APT10': (-3.5, -3.5),
    'KillNet':   (-1.8,  2.4),
    'TEMP_Veles':(-1.8,  0.8),
    'NSA_CIA':   ( 0.3,  3.2),
    'Unit8200':  ( 1.8,  2.5),
    'GCHQ':      ( 3.2,  2.0),
    'DGSE_LIO':  ( 1.2,  1.2),
    'ANSSI':     ( 2.0, -0.5),
    'CISA':      ( 3.5, -0.5),
    'FiveEyes':  ( 3.8,  1.0),
    'AIEA':      ( 0.4, -2.2),
    'EDF_op':    ( 0.0, -4.0),
}

# ─────────────────────────────────────────────
# 5. CONSTRUCTION DU GRAPHE
# ─────────────────────────────────────────────
G = nx.DiGraph()
for nid in NODE_IDS:
    G.add_node(nid)
for (src, dst, etype, _) in EDGES:
    G.add_edge(src, dst, etype=etype)

# ─────────────────────────────────────────────
# 6. DESSIN
# ─────────────────────────────────────────────
fig, ax = plt.subplots(figsize=(20, 16))
fig.patch.set_facecolor(BG_COLOR)
ax.set_facecolor(BG_COLOR)

# Arêtes par type
for etype, style in EDGE_STYLES.items():
    edge_list = [(s, d) for s, d, t in G.edges(data='etype') if t == etype]
    if not edge_list:
        continue
    # On dessine chaque arête séparément pour flèche individuelle
    for (src, dst) in edge_list:
        x_src, y_src = POS[src]
        x_dst, y_dst = POS[dst]
        # Flèche avec courbure légère pour arcs bidirectionnels
        # Vérifie si arête réciproque
        has_reverse = G.has_edge(dst, src)
        rad = 0.15 if has_reverse else 0.0
        ax.annotate(
            '',
            xy=(x_dst, y_dst),
            xytext=(x_src, y_src),
            arrowprops=dict(
                arrowstyle='->', color=style['color'],
                lw=style['width'], alpha=style['alpha'],
                linestyle=style['style'],
                connectionstyle=f'arc3,rad={rad}',
                shrinkA=14, shrinkB=14,
            ),
        )

# Nœuds
nx.draw_networkx_nodes(
    G, POS, ax=ax,
    node_color=NODE_COLORS,
    node_size=NODE_SIZES,
    alpha=0.92,
    edgecolors='white',
    linewidths=1.8,
)

# Labels : collecte d'abord, puis adjustText
texts = []
for nid in NODE_IDS:
    x, y = POS[nid]
    t = ax.text(
        x, y, LABELS[nid],
        fontsize=7.5,
        fontfamily='P052',
        fontweight='bold',
        ha='center', va='center',
        color='white' if CATEGORIES[nid] in ('offensif', 'défenseur') else 'white',
        multialignment='center',
        linespacing=1.2,
        zorder=10,
        path_effects=[pe.withStroke(linewidth=2.5, foreground='#00000099')],
    )
    texts.append(t)

# adjust_text pour éliminer les superpositions
adjust_text(
    texts,
    x=[POS[nid][0] for nid in NODE_IDS],
    y=[POS[nid][1] for nid in NODE_IDS],
    ax=ax,
    expand_text=(1.25, 1.35),
    expand_points=(1.4, 1.4),
    force_text=(0.5, 0.5),
    force_points=(0.3, 0.3),
    avoid_self=True,
    min_arrow_len=0,
)

# ─────────────────────────────────────────────
# 7. LÉGENDE COMPLÈTE
# ─────────────────────────────────────────────
# Légende nœuds
legend_nodes = [
    mpatches.Patch(facecolor=COLORS['offensif'],   label='Acteur offensif hostile'),
    mpatches.Patch(facecolor=COLORS['proxy'],      label='Proxy / criminel / ambigu'),
    mpatches.Patch(facecolor=COLORS['ambivalent'], label='Ambivalent (offensif & défenseur)'),
    mpatches.Patch(facecolor=COLORS['défenseur'],  label='Défenseur institutionnel'),
    mpatches.Patch(facecolor=COLORS['normatif'],   label='Acteur normatif'),
    mpatches.Patch(facecolor=COLORS['opérateur'],  label='Opérateur nucléaire civil'),
]
# Légende arêtes
legend_edges = [
    mlines.Line2D([], [], color='#C62828', lw=2.2, linestyle='-',
                  marker='>', markersize=7, label='Opération offensive documentée'),
    mlines.Line2D([], [], color='#E65100', lw=1.8, linestyle='--',
                  marker='>', markersize=7, label='Relation proxy / indirecte'),
    mlines.Line2D([], [], color='#2E7D32', lw=2.0, linestyle='-',
                  marker='>', markersize=7, label='Coordination défensive'),
    mlines.Line2D([], [], color='#546E7A', lw=1.6, linestyle=':',
                  marker='>', markersize=7, label='Tension / asymétrie normative'),
]
leg1 = ax.legend(
    handles=legend_nodes,
    title='Catégorie d\'acteur',
    title_fontsize=9,
    fontsize=8.5,
    loc='upper left',
    bbox_to_anchor=(0.00, 0.99),
    framealpha=0.93,
    edgecolor='#CCCCBB',
    facecolor='#FDFAF4',
    borderpad=0.8,
    labelspacing=0.5,
    prop={'family': 'P052'},
)
leg1.get_title().set_fontfamily('P052')
ax.add_artist(leg1)

leg2 = ax.legend(
    handles=legend_edges,
    title='Type de relation',
    title_fontsize=9,
    fontsize=8.5,
    loc='lower left',
    bbox_to_anchor=(0.00, 0.01),
    framealpha=0.93,
    edgecolor='#CCCCBB',
    facecolor='#FDFAF4',
    borderpad=0.8,
    labelspacing=0.5,
    prop={'family': 'P052'},
)
leg2.get_title().set_fontfamily('P052')

# Légende taille nœuds
for intensity, label in [(5, 'Intensité modérée\n(score 5)'), (9, 'Intensité élevée\n(score 9)')]:
    sz = 180 + intensity**2 * 18
    ax.scatter([], [], s=sz, color='#888877', alpha=0.7, label=label)
leg3 = ax.legend(
    title='Taille = intensité documentée',
    title_fontsize=9,
    fontsize=8.5,
    loc='upper right',
    bbox_to_anchor=(1.00, 0.99),
    framealpha=0.93,
    edgecolor='#CCCCBB',
    facecolor='#FDFAF4',
    borderpad=0.8,
    prop={'family': 'P052'},
    scatterpoints=1,
)
leg3.get_title().set_fontfamily('P052')

# ─────────────────────────────────────────────
# 8. TITRE, SOUS-TITRE, NOTE DE BAS DE PAGE
# ─────────────────────────────────────────────
ax.set_title(
    'Cartographie des acteurs dans l\'espace cyber-nucléaire civil',
    fontsize=17, fontfamily='P052', fontweight='bold',
    color='#1A1A1A', pad=14,
)
fig.text(
    0.5, 0.94,
    'Relations documentées, 2010–2026',
    ha='center', fontsize=12, fontfamily='P052',
    style='italic', color='#444433',
)

note = (
    'Sources primaires : DOJ Akulov Indictment 2022 (HAVEX / Wolf Creek) — '
    'ESET/CERT-UA (Industroyer) — Dragos XENOTIME (TRITON 2017) — '
    'CISA AA24-038A (Volt Typhoon) — Zetter K. (2014) Countdown to Zero Day '
    '(Stuxnet/Natanz) — NYT/Sanger (2016) (NITRO ZEUS) — '
    'CISA AA22-083A, AA23-144A — LPM 2013 art.22 — Mandiant 2022 (KillNet) — '
    'AIEA INFCIRC/225.'
)
fig.text(
    0.5, 0.007,
    note,
    ha='center', fontsize=7.0, fontfamily='P052',
    style='italic', color='#555544',
    wrap=True,
)

ax.axis('off')
ax.set_xlim(-5.0, 5.2)
ax.set_ylim(-5.2, 4.4)

plt.tight_layout(rect=[0, 0.04, 1, 0.93])

# ─────────────────────────────────────────────
# 9. EXPORT
# ─────────────────────────────────────────────
out_png = '/home/user/maison-m-dina/figures/figure1_network.png'
out_svg = '/home/user/maison-m-dina/figures/figure1_network.svg'
fig.savefig(out_png, dpi=300, bbox_inches='tight', facecolor=BG_COLOR)
fig.savefig(out_svg, format='svg', bbox_inches='tight', facecolor=BG_COLOR)
print(f"Figure 1 exportée : {out_png}  |  {out_svg}")
plt.close()
