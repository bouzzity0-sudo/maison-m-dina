"""
Figure 1 — Graphe de rivalités acteurs cyber-nucléaire — ITERATION 3
Corrections : suppression grille, écartement clusters offensif/défensif,
EDF agrandi + couleur plus visible, séparation KillNet/TEMP.Veles,
AIEA annotation contextuelle, CISA/ANSSI désolidarisés verticalement.
"""
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import matplotlib.lines as mlines
import matplotlib.patheffects as pe
import networkx as nx

BG_COLOR   = '#F9F6EF'
FONT       = 'P052'

COLORS = {
    'offensif':   '#8B0000',
    'proxy':      '#C4600A',
    'ambivalent': '#5B2C8D',
    'défenseur':  '#1B5E20',
    'normatif':   '#1A237E',
    'opérateur':  '#546E7A',   # gris-bleu plus visible que #37474F
}

EDGE_STYLES = {
    'offensive': dict(color='#C62828', ls='-',  lw=2.2, alpha=0.88),
    'proxy':     dict(color='#E65100', ls='--', lw=1.7, alpha=0.82),
    'défensive': dict(color='#2E7D32', ls='-',  lw=2.0, alpha=0.82),
    'tension':   dict(color='#607D8B', ls=':',  lw=1.5, alpha=0.78),
}

# ─── NŒUDS ───
# (id, label, catégorie, intensité)
NODES = [
    ('FSB_C16',   'FSB Centre 16',         'offensif',   9),
    ('GRU_SW',    'GRU Sandworm',           'offensif',   9),
    ('Lazarus',   'Lazarus / Kimsuky',      'offensif',   8),
    ('APT33',     'APT33 (Iran)',           'offensif',   7),
    ('MSS_APT10', 'MSS APT10 /\nVolt Typhoon', 'offensif', 8),
    ('KillNet',   'KillNet',               'proxy',      5),
    ('TEMP_V',    'TEMP.Veles\n(XENOTIME)', 'proxy',      7),
    ('NSA_CIA',   'NSA / CIA',             'ambivalent', 10),
    ('Unit8200',  'Unit 8200 (Israël)',     'ambivalent',  8),
    ('GCHQ',      'GCHQ (UK)',             'ambivalent',  7),
    ('DGSE_LIO',  'DGSE / LIO (France)',   'ambivalent',  6),
    ('ANSSI',     'ANSSI / CERT-FR',       'défenseur',   8),
    ('CISA',      'CISA / NSA défensif',   'défenseur',   9),
    ('FiveEyes',  'Five Eyes',             'défenseur',   9),
    ('AIEA',      'AIEA',                  'normatif',    7),
    ('EDF_op',    'EDF / Framatome / Orano','opérateur',  8),  # ×1.5 intensité visuelle
]
NODE_IDS    = [n[0] for n in NODES]
LABELS      = {n[0]: n[1] for n in NODES}
CATEGORIES  = {n[0]: n[2] for n in NODES}
INTENSITIES = {n[0]: n[3] for n in NODES}
NODE_SIZES  = {nid: 400 + INTENSITIES[nid]**2 * 28 for nid in NODE_IDS}

# ─── POSITIONS ───
# Itération 3 : cluster offensif écarté (≥0.8 Y entre chaque),
# CISA/ANSSI séparés verticalement, KillNet/TEMP_V distanciés
POS = {
    'FSB_C16':   (-4.2,  3.0),   # monté pour écarter du cluster
    'GRU_SW':    (-4.2,  1.6),   # +1.0 vs FSB
    'Lazarus':   (-3.6,  0.2),   # +1.4 vs GRU
    'APT33':     (-3.4, -1.4),   # +1.6 vs Lazarus
    'MSS_APT10': (-4.0, -3.0),   # +1.6 vs APT33
    'KillNet':   (-1.6,  3.8),   # déplacé à gauche pour éviter collision
    'TEMP_V':    (-2.4,  2.4),   # séparé de KillNet
    'NSA_CIA':   ( 0.0,  3.8),
    'Unit8200':  ( 1.6,  2.8),
    'GCHQ':      ( 3.2,  3.0),
    'DGSE_LIO':  ( 1.0,  1.6),
    'ANSSI':     ( 2.0, -0.8),   # séparé de CISA
    'CISA':      ( 3.6,  0.4),   # remonté par rapport à ANSSI
    'FiveEyes':  ( 4.2,  1.8),
    'AIEA':      ( 0.2, -2.4),
    'EDF_op':    ( 0.0, -4.4),
}

# Offset des labels (dx, dy). Itération 3 : offsets latéraux pour les clusters denses
LABEL_OFFSET = {
    'FSB_C16':   (-0.90,  0.00),  # à gauche du nœud
    'GRU_SW':    (-0.90,  0.00),  # à gauche
    'Lazarus':   (-0.90,  0.00),  # à gauche
    'APT33':     (-0.90,  0.00),  # à gauche
    'MSS_APT10': (-0.90,  0.00),  # à gauche
    'KillNet':   ( 0.00,  0.65),  # au-dessus
    'TEMP_V':    (-0.90,  0.00),  # à gauche
    'NSA_CIA':   ( 0.00,  0.65),  # au-dessus
    'Unit8200':  ( 0.00,  0.65),  # au-dessus
    'GCHQ':      ( 0.90,  0.00),  # à droite
    'DGSE_LIO':  ( 0.00,  0.65),  # au-dessus
    'ANSSI':     ( 0.90,  0.00),  # à droite
    'CISA':      ( 0.90,  0.00),  # à droite
    'FiveEyes':  ( 0.90,  0.00),  # à droite
    'AIEA':      ( 0.00,  0.65),  # au-dessus
    'EDF_op':    ( 0.00,  0.72),  # au-dessus (grand nœud)
}

# ─── ARÊTES ───
EDGES = [
    ('FSB_C16',  'EDF_op',   'offensive'),
    ('GRU_SW',   'EDF_op',   'offensive'),
    ('TEMP_V',   'EDF_op',   'offensive'),
    ('MSS_APT10','EDF_op',   'offensive'),
    ('APT33',    'EDF_op',   'offensive'),
    ('Lazarus',  'EDF_op',   'offensive'),
    ('KillNet',  'EDF_op',   'proxy'),
    ('KillNet',  'FSB_C16',  'proxy'),
    ('TEMP_V',   'GRU_SW',   'proxy'),
    ('NSA_CIA',  'Unit8200', 'offensive'),
    ('NSA_CIA',  'EDF_op',   'tension'),
    ('CISA',     'EDF_op',   'défensive'),
    ('ANSSI',    'EDF_op',   'défensive'),
    ('FiveEyes', 'CISA',     'défensive'),
    ('FiveEyes', 'GCHQ',     'défensive'),
    ('AIEA',     'EDF_op',   'tension'),
    ('AIEA',     'ANSSI',    'défensive'),
    ('APT33',    'MSS_APT10','tension'),
    ('DGSE_LIO', 'ANSSI',    'défensive'),
    ('NSA_CIA',  'CISA',     'défensive'),
]

# ─── GRAPHE ───
G = nx.DiGraph()
for nid in NODE_IDS:
    G.add_node(nid)
for (src, dst, etype) in EDGES:
    G.add_edge(src, dst, etype=etype)

# ─── FIGURE ───
fig, ax = plt.subplots(figsize=(22, 17))
fig.patch.set_facecolor(BG_COLOR)
ax.set_facecolor(BG_COLOR)

# Zones de fond sémantiques (pas de grille cartésienne)
ax.axvspan(-5.6, -1.0, color='#FDECEA', alpha=0.18, zorder=0)  # zone offensive
ax.axvspan(-1.0,  1.0, color='#F5F0FF', alpha=0.12, zorder=0)  # zone ambivalente
ax.axvspan( 1.0,  5.6, color='#E8F5E9', alpha=0.18, zorder=0)  # zone défensive

# ─── ARÊTES ───
for (src, dst, etype) in EDGES:
    s = EDGE_STYLES[etype]
    xS, yS = POS[src]
    xD, yD = POS[dst]
    has_rev = G.has_edge(dst, src)
    rad = 0.18 if has_rev else 0.0
    ax.annotate(
        '',
        xy=(xD, yD), xytext=(xS, yS),
        arrowprops=dict(
            arrowstyle='->', color=s['color'],
            lw=s['lw'], alpha=s['alpha'],
            linestyle=s['ls'],
            connectionstyle=f'arc3,rad={rad}',
            shrinkA=17, shrinkB=17,
        ),
        zorder=3,
    )

# ─── NŒUDS ───
for nid in NODE_IDS:
    x, y = POS[nid]
    ax.scatter(
        x, y,
        s=NODE_SIZES[nid],
        color=COLORS[CATEGORIES[nid]],
        zorder=5,
        alpha=0.92,
        edgecolors='white',
        linewidths=2.0,
    )

# ─── LABELS EXTERNES ───
# Chaque label est placé au-dessus (ou à côté) du nœud avec fond coloré
for nid in NODE_IDS:
    x, y = POS[nid]
    dx, dy = LABEL_OFFSET[nid]
    lx, ly = x + dx, y + dy
    clr = COLORS[CATEGORIES[nid]]
    lbl = LABELS[nid]

    # ha dépend de la direction du label
    ha_map = {
        'FSB_C16':'right','GRU_SW':'right','Lazarus':'right','APT33':'right','MSS_APT10':'right',
        'TEMP_V':'right',
        'GCHQ':'left','ANSSI':'left','CISA':'left','FiveEyes':'left',
    }
    ha = ha_map.get(nid, 'center')
    va = 'center' if ha in ('left','right') else 'bottom'

    ax.text(
        lx, ly, lbl,
        ha=ha, va=va,
        fontsize=8.2, fontfamily=FONT, fontweight='bold',
        color='white',
        multialignment='center',
        linespacing=1.25,
        zorder=8,
        bbox=dict(
            boxstyle='round,pad=0.28',
            facecolor=clr,
            alpha=0.92,
            edgecolor='white',
            linewidth=1.0,
        ),
    )

# ─── LÉGENDES ───
leg_nodes = [
    mpatches.Patch(facecolor=COLORS['offensif'],   label='Acteur offensif hostile'),
    mpatches.Patch(facecolor=COLORS['proxy'],      label='Proxy / criminel / ambigu'),
    mpatches.Patch(facecolor=COLORS['ambivalent'], label='Ambivalent (offensif & défenseur)'),
    mpatches.Patch(facecolor=COLORS['défenseur'],  label='Défenseur institutionnel'),
    mpatches.Patch(facecolor=COLORS['normatif'],   label='Acteur normatif'),
    mpatches.Patch(facecolor=COLORS['opérateur'],  label='Opérateur nucléaire civil'),
]
leg_edges = [
    mlines.Line2D([], [], color='#C62828', lw=2.2, ls='-',  marker='>', ms=8,
                  label='Opération offensive documentée'),
    mlines.Line2D([], [], color='#E65100', lw=1.8, ls='--', marker='>', ms=8,
                  label='Relation proxy / indirecte'),
    mlines.Line2D([], [], color='#2E7D32', lw=2.0, ls='-',  marker='>', ms=8,
                  label='Coordination défensive'),
    mlines.Line2D([], [], color='#607D8B', lw=1.6, ls=':',  marker='>', ms=8,
                  label='Tension / asymétrie normative'),
]
l1 = ax.legend(
    handles=leg_nodes, title="Catégorie d'acteur",
    title_fontsize=9, fontsize=8.5,
    loc='upper left', bbox_to_anchor=(0.0, 1.0),
    framealpha=0.94, edgecolor='#CCCCBB', facecolor='#FDFAF4',
    borderpad=0.9, labelspacing=0.55,
    prop={'family': FONT},
)
l1.get_title().set_fontfamily(FONT)
ax.add_artist(l1)

l2 = ax.legend(
    handles=leg_edges, title='Type de relation',
    title_fontsize=9, fontsize=8.5,
    loc='lower left', bbox_to_anchor=(0.0, 0.0),
    framealpha=0.94, edgecolor='#CCCCBB', facecolor='#FDFAF4',
    borderpad=0.9, labelspacing=0.55,
    prop={'family': FONT},
)
l2.get_title().set_fontfamily(FONT)
ax.add_artist(l2)

for intensity, lbl in [(5, 'Intensité modérée (5)'), (9, 'Intensité élevée (9)')]:
    ax.scatter([], [], s=400+intensity**2*28, color='#888877', alpha=0.75, label=lbl)
l3 = ax.legend(
    title='Taille = intensité documentée',
    title_fontsize=9, fontsize=8.5,
    loc='upper right', bbox_to_anchor=(1.0, 1.0),
    framealpha=0.94, edgecolor='#CCCCBB', facecolor='#FDFAF4',
    borderpad=0.9, scatterpoints=1,
    prop={'family': FONT},
)
l3.get_title().set_fontfamily(FONT)

# ─── ANNOTATIONS ZONES ───
# Zone offensive
ax.text(-4.6, 3.6, 'ACTEURS\nOFFENSIFS',
        ha='center', fontsize=8, fontfamily=FONT, color='#8B0000',
        fontweight='bold', style='italic', alpha=0.5,
        bbox=dict(boxstyle='round,pad=0.2', facecolor='#FDECEA', alpha=0.6, edgecolor='none'))
# Zone défensive
ax.text( 4.1, 3.4, 'ACTEURS\nDÉFENSEURS',
        ha='center', fontsize=8, fontfamily=FONT, color='#1B5E20',
        fontweight='bold', style='italic', alpha=0.5,
        bbox=dict(boxstyle='round,pad=0.2', facecolor='#E8F5E9', alpha=0.6, edgecolor='none'))

# ─── TITRE ───
ax.set_title(
    "Cartographie des acteurs dans l'espace cyber-nucléaire civil",
    fontsize=18, fontfamily=FONT, fontweight='bold', color='#1A1A1A', pad=16,
)
fig.text(
    0.5, 0.945, 'Relations documentées, 2010–2026',
    ha='center', fontsize=12, fontfamily=FONT, style='italic', color='#444433',
)
fig.text(
    0.5, 0.006,
    'Sources primaires : DOJ Akulov Indictment 2022 (HAVEX / Wolf Creek) — ESET/CERT-UA '
    '(Industroyer) — Dragos XENOTIME (TRITON 2017) — CISA AA24-038A (Volt Typhoon OT) — '
    'Zetter K. (2014) Countdown to Zero Day (Stuxnet/Natanz) — NYT/Sanger (2016) '
    '(NITRO ZEUS) — CISA AA22-083A, AA23-144A — LPM 2013 art.22 — '
    'Mandiant 2022 (KillNet) — AIEA INFCIRC/225.',
    ha='center', fontsize=7.2, fontfamily=FONT, style='italic', color='#555544',
)

# Annotation contextuelle AIEA
ax.annotate(
    'Normes\nnon contraignantes\n(INFCIRC/225)',
    xy=(0.2, -2.4), xytext=(1.4, -3.2),
    fontsize=7, fontfamily=FONT, style='italic', color='#1A237E',
    arrowprops=dict(arrowstyle='-', color='#1A237E', lw=0.8, alpha=0.6),
    zorder=9,
)

ax.axis('off')
ax.set_xlim(-5.8, 5.8)
ax.set_ylim(-5.6, 5.2)
plt.tight_layout(rect=[0, 0.04, 1, 0.94])

fig.savefig('/home/user/maison-m-dina/figures/figure1_network.png',
            dpi=300, bbox_inches='tight', facecolor=BG_COLOR)
fig.savefig('/home/user/maison-m-dina/figures/figure1_network.svg',
            format='svg', bbox_inches='tight', facecolor=BG_COLOR)
print("Figure 1 — OK")
plt.close()
