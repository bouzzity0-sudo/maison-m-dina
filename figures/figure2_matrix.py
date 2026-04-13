"""
Figure 2 — Matrice posture × territoire C1-C9
Thèse IFG — Géopolitique du nucléaire civil
"""
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import matplotlib.ticker as ticker
from adjustText import adjust_text

BG_COLOR = '#F9F6EF'

COLORS = {
    'offensif':   '#8B0000',
    'proxy':      '#D4720A',
    'ambivalent': '#5B2C8D',
    'défenseur':  '#1B5E20',
    'normatif':   '#1A237E',
    'opérateur':  '#37474F',
}

# ─────────────────────────────────────────────
# Définition des chaînes nucléaires C1→C9
# ─────────────────────────────────────────────
C_LABELS = {
    1: 'C1 — Mines\nd\'uranium',
    2: 'C2 — Conversion\nenrichissement',
    3: 'C3 — Fabrication\ncombustible',
    4: 'C4 — Réacteur\nnucléaire',
    5: 'C5 — Réseau\nélectrique OT',
    6: 'C6 — Gestion\ndéchets',
    7: 'C7 — Transport\nmatières fissiles',
    8: 'C8 — Cybersystèmes\ntransverses',
    9: 'C9 — Territoire\ndoctrinal',
}

# Axe X : posture
# -1.0 = offensif pur | 0.0 = ambivalent | +1.0 = défenseur pur
# Axe Y : chaîne C1-C9 (1 = bas, 9 = haut)
# taille = intensité documentée (1-10)
ACTORS = [
    # id, label, catégorie, pos_x, pos_y (chaîne principale ciblée), intensité
    ('FSB_C16',    'FSB\nCentre 16',          'offensif',   -0.90, 5.1, 9),
    ('GRU_SW',     'GRU\nSandworm',            'offensif',   -0.82, 4.9, 9),
    ('Lazarus',    'Lazarus /\nKimsuky',        'offensif',   -0.75, 8.2, 8),
    ('APT33',      'APT33\n(Iran)',             'offensif',   -0.70, 4.3, 7),
    ('MSS_APT10',  'MSS APT10 /\nVolt Typhoon','offensif',   -0.80, 5.4, 8),
    ('KillNet',    'KillNet',                  'proxy',      -0.55, 5.8, 5),
    ('TEMP_Veles', 'TEMP.Veles',               'proxy',      -0.60, 4.0, 7),
    ('NSA_CIA',    'NSA / CIA',                'ambivalent', -0.10, 8.6, 10),
    ('Unit8200',   'Unit 8200\n(Israël)',       'ambivalent', -0.05, 2.2, 8),
    ('GCHQ',       'GCHQ (UK)',                'ambivalent',  0.08, 8.4, 7),
    ('DGSE_LIO',   'DGSE / LIO\n(France)',     'ambivalent',  0.05, 8.1, 6),
    ('ANSSI',      'ANSSI /\nCERT-FR',         'défenseur',   0.78, 8.5, 8),
    ('CISA',       'CISA / NSA\ndéfensif',     'défenseur',   0.85, 8.8, 9),
    ('FiveEyes',   'Five Eyes',                'défenseur',   0.90, 9.0, 9),
    ('AIEA',       'AIEA',                     'normatif',    0.72, 9.1, 7),
    ('EDF_op',     'EDF / Framatome\n/ Orano', 'opérateur',   0.15, 4.5, 6),
]

# ─────────────────────────────────────────────
# FIGURE
# ─────────────────────────────────────────────
fig, ax = plt.subplots(figsize=(18, 14))
fig.patch.set_facecolor(BG_COLOR)
ax.set_facecolor(BG_COLOR)

# Zones de fond (colonnes posture)
ax.axvspan(-1.05, -0.4, color='#FDECEA', alpha=0.55, zorder=0, label='_nolegend_')
ax.axvspan(-0.4,  0.4,  color='#F3E5FF', alpha=0.45, zorder=0, label='_nolegend_')
ax.axvspan(0.4,   1.05, color='#E8F5E9', alpha=0.55, zorder=0, label='_nolegend_')

# Lignes de grille horizontales légères
for c in range(1, 10):
    ax.axhline(c, color='#D5D0C4', lw=0.6, zorder=1, alpha=0.7)

# Ligne centrale (ambivalent)
ax.axvline(0, color='#BBBBAA', lw=1.0, linestyle='--', zorder=1, alpha=0.8)

# Bulles
texts = []
for (aid, label, cat, px, py, intensity) in ACTORS:
    size = 120 + intensity**2 * 22
    ax.scatter(
        px, py,
        s=size,
        color=COLORS[cat],
        alpha=0.82,
        edgecolors='white',
        linewidths=1.8,
        zorder=5,
    )
    t = ax.text(
        px, py, label,
        fontsize=7.8, fontfamily='P052', fontweight='bold',
        ha='center', va='center', color='white',
        multialignment='center', linespacing=1.2,
        zorder=10,
        bbox=dict(
            boxstyle='round,pad=0.15',
            facecolor=COLORS[cat],
            alpha=0.0,
            edgecolor='none',
        ),
    )
    texts.append(t)

# Évite les superpositions
adjust_text(
    texts,
    x=[a[3] for a in ACTORS],
    y=[a[4] for a in ACTORS],
    ax=ax,
    expand_text=(1.3, 1.5),
    expand_points=(1.5, 1.5),
    force_text=(0.6, 0.7),
    force_points=(0.4, 0.4),
    avoid_self=True,
    autoalign='xy',
    arrowprops=dict(arrowstyle='-', color='#999988', lw=0.7),
    min_arrow_len=5,
)

# ─────────────────────────────────────────────
# AXES & LABELS
# ─────────────────────────────────────────────
ax.set_xlim(-1.05, 1.08)
ax.set_ylim(0.3, 9.8)

# Axe X
ax.set_xticks([-0.85, -0.45, 0.0, 0.45, 0.85])
ax.set_xticklabels(
    ['Offensif\npur', 'Offensif\nmodéré', 'Ambivalent', 'Défensif\nmodéré', 'Défenseur\npur'],
    fontsize=10, fontfamily='P052', color='#333322',
)

# Axe Y — chaînes C1-C9
ax.set_yticks(list(range(1, 10)))
ax.set_yticklabels(
    [C_LABELS[c] for c in range(1, 10)],
    fontsize=9, fontfamily='P052', color='#333322',
)
ax.yaxis.set_tick_params(length=0)

ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['left'].set_color('#BBBBAA')
ax.spines['bottom'].set_color('#BBBBAA')

ax.set_xlabel(
    'Posture stratégique',
    fontsize=12, fontfamily='P052', fontweight='bold', color='#2A2A1A', labelpad=10,
)
ax.set_ylabel(
    'Chaîne nucléaire civile ciblée / concernée',
    fontsize=12, fontfamily='P052', fontweight='bold', color='#2A2A1A', labelpad=12,
)

# ─────────────────────────────────────────────
# LÉGENDE
# ─────────────────────────────────────────────
legend_cats = [
    mpatches.Patch(facecolor=COLORS['offensif'],   label='Acteur offensif hostile'),
    mpatches.Patch(facecolor=COLORS['proxy'],      label='Proxy / criminel / ambigu'),
    mpatches.Patch(facecolor=COLORS['ambivalent'], label='Ambivalent (offensif & défenseur)'),
    mpatches.Patch(facecolor=COLORS['défenseur'],  label='Défenseur institutionnel'),
    mpatches.Patch(facecolor=COLORS['normatif'],   label='Acteur normatif'),
    mpatches.Patch(facecolor=COLORS['opérateur'],  label='Opérateur nucléaire civil'),
]
for intensity, lbl in [(5, 'Intensité 5 (modérée)'), (9, 'Intensité 9 (élevée)')]:
    sz = 120 + intensity**2 * 22
    ax.scatter([], [], s=sz, color='#888877', alpha=0.7, label=lbl)

leg1 = ax.legend(
    handles=legend_cats,
    title='Catégorie d\'acteur',
    title_fontsize=9, fontsize=8.5,
    loc='lower left', bbox_to_anchor=(0.00, 0.00),
    framealpha=0.93, edgecolor='#CCCCBB', facecolor='#FDFAF4',
    borderpad=0.8, labelspacing=0.5,
    prop={'family': 'P052'},
)
leg1.get_title().set_fontfamily('P052')
ax.add_artist(leg1)

leg2 = ax.legend(
    title='Taille = intensité documentée',
    title_fontsize=9, fontsize=8.5,
    loc='lower right', bbox_to_anchor=(1.0, 0.00),
    framealpha=0.93, edgecolor='#CCCCBB', facecolor='#FDFAF4',
    borderpad=0.8,
    prop={'family': 'P052'},
    scatterpoints=1,
)
leg2.get_title().set_fontfamily('P052')

# ─────────────────────────────────────────────
# TITRE & NOTES
# ─────────────────────────────────────────────
ax.set_title(
    'Positionnement des acteurs : posture stratégique × chaîne nucléaire civile (C1–C9)',
    fontsize=15, fontfamily='P052', fontweight='bold', color='#1A1A1A', pad=14,
)
fig.text(
    0.5, 0.934,
    'Intensité documentée des activités, 2010–2026',
    ha='center', fontsize=11, fontfamily='P052', style='italic', color='#444433',
)

note = (
    'Sources : CISA advisories AA22-083A, AA23-144A, AA24-038A — DOJ Akulov Indictment 2022 — '
    'Dragos XENOTIME/TRITON 2017 — ESET Industroyer — Zetter K. (2014) — '
    'NYT/Sanger (2016) — Mandiant 2022 — LPM 2013 art.22 — AIEA INFCIRC/225 — '
    'UKUSA Agreement. | C1-C9 : classification interne adaptée de AIEA/NSS-17-T (2011).'
)
fig.text(
    0.5, 0.005,
    note,
    ha='center', fontsize=7.0, fontfamily='P052',
    style='italic', color='#555544',
)

plt.tight_layout(rect=[0, 0.04, 1, 0.93])

out_png = '/home/user/maison-m-dina/figures/figure2_matrix.png'
out_svg = '/home/user/maison-m-dina/figures/figure2_matrix.svg'
fig.savefig(out_png, dpi=300, bbox_inches='tight', facecolor=BG_COLOR)
fig.savefig(out_svg, format='svg', bbox_inches='tight', facecolor=BG_COLOR)
print(f"Figure 2 exportée : {out_png}  |  {out_svg}")
plt.close()
