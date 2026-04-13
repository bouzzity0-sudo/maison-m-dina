"""
Figure 2 — Matrice posture × territoire C1-C9 — ITERATION 3
Corrections : C7/C8 fusionnés, cluster C8-C9 étalé, X ambivalents différenciés,
EDF plus visible avec label externe, adjustText avec shrink amélioré.
"""
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from adjustText import adjust_text

BG_COLOR = '#F9F6EF'
FONT = 'P052'

COLORS = {
    'offensif':   '#8B0000',
    'proxy':      '#C4600A',
    'ambivalent': '#5B2C8D',
    'défenseur':  '#1B5E20',
    'normatif':   '#1A237E',
    'opérateur':  '#546E7A',
}

# ─────────────────────────────────────────────
# CHAÎNES C1–C9 (C7+C8 fusionnés en C7-C8)
# ─────────────────────────────────────────────
C_LABELS = {
    1: 'C1 — Mines\nd\'uranium',
    2: 'C2 — Conversion /\nenrichissement',
    3: 'C3 — Fabrication\ncombustible',
    4: 'C4 — Réacteur\nnucléaire',
    5: 'C5 — Réseau\nélectrique OT',
    6: 'C6 — Gestion\ndéchets',
    7: 'C7-C8 — Transport /\nCybersystèmes',  # fusionné
    8: 'C9 — Territoire\ndoctrinal',           # décalé
}
# Mapping numéro affiché → position Y sur le graphe
Y_TICKS = [1, 2, 3, 4, 5, 6, 7, 8]
Y_LABELS = [C_LABELS[i] for i in Y_TICKS]

# ─────────────────────────────────────────────
# ACTEURS — positions recalculées
# C9 (territoire doctrinal) = Y=8, C1 = Y=1
# Cluster ambivalent C8-C9 étalé de 7.5 à 8.6
# ─────────────────────────────────────────────
ACTORS = [
    # id, label, catégorie, pos_x, pos_y, intensité
    ('FSB_C16',   'FSB\nCentre 16',          'offensif',   -0.88, 5.0, 9),
    ('GRU_SW',    'GRU\nSandworm',            'offensif',   -0.80, 4.7, 9),
    ('APT33',     'APT33 (Iran)',             'offensif',   -0.70, 4.2, 7),
    ('MSS_APT10', 'MSS APT10 /\nVolt Typhoon','offensif',  -0.78, 5.3, 8),
    ('Lazarus',   'Lazarus /\nKimsuky',       'offensif',   -0.68, 8.0, 8),  # cible doctrinal/nuclé
    ('KillNet',   'KillNet',                 'proxy',      -0.52, 5.6, 5),
    ('TEMP_V',    'TEMP.Veles',              'proxy',      -0.58, 3.8, 7),
    # Ambivalents — X différenciés, Y étalés
    ('NSA_CIA',   'NSA / CIA',              'ambivalent', -0.12, 7.5, 10),
    ('Unit8200',  'Unit 8200\n(Israël)',     'ambivalent', -0.05, 2.0, 8),   # cible enrichissement
    ('GCHQ',      'GCHQ (UK)',              'ambivalent',  0.14, 8.0, 7),
    ('DGSE_LIO',  'DGSE / LIO\n(France)',   'ambivalent',  0.06, 8.4, 6),
    # Défenseurs — X > 0.5, Y étalés
    ('ANSSI',     'ANSSI /\nCERT-FR',       'défenseur',   0.76, 8.2, 8),
    ('CISA',      'CISA / NSA\ndéfensif',   'défenseur',   0.84, 8.5, 9),
    ('FiveEyes',  'Five Eyes',              'défenseur',   0.88, 8.8, 9),
    # Normatif
    ('AIEA',      'AIEA',                   'normatif',    0.70, 8.6, 7),
    # Opérateur — plus grand et plus visible
    ('EDF_op',    'EDF / Framatome\n/ Orano','opérateur',  0.12, 4.4, 8),
]

# ─────────────────────────────────────────────
# FIGURE
# ─────────────────────────────────────────────
fig, ax = plt.subplots(figsize=(18, 13))
fig.patch.set_facecolor(BG_COLOR)
ax.set_facecolor(BG_COLOR)

# Zones de fond
ax.axvspan(-1.05, -0.35, color='#FDECEA', alpha=0.55, zorder=0)
ax.axvspan(-0.35,  0.35, color='#F3E5FF', alpha=0.40, zorder=0)
ax.axvspan( 0.35,  1.05, color='#E8F5E9', alpha=0.55, zorder=0)

# Lignes horizontales
for c in Y_TICKS:
    ax.axhline(c, color='#D5D0C4', lw=0.6, zorder=1, alpha=0.7)

# Séparateurs verticaux des zones
ax.axvline(-0.35, color='#BBBBAA', lw=0.8, linestyle='--', zorder=1, alpha=0.7)
ax.axvline( 0.35, color='#BBBBAA', lw=0.8, linestyle='--', zorder=1, alpha=0.7)
ax.axvline( 0.0,  color='#CCCCBB', lw=0.5, linestyle=':',  zorder=1, alpha=0.5)

# ─── Bulles ───
texts = []
for (aid, label, cat, px, py, intensity) in ACTORS:
    size = 150 + intensity**2 * 25
    ax.scatter(
        px, py, s=size,
        color=COLORS[cat],
        alpha=0.85,
        edgecolors='white',
        linewidths=1.8,
        zorder=5,
    )
    # Label externe (pas à l'intérieur de la bulle)
    t = ax.text(
        px, py + 0.08, label,
        fontsize=7.8, fontfamily=FONT, fontweight='bold',
        ha='center', va='bottom', color='white',
        multialignment='center', linespacing=1.2,
        zorder=10,
        bbox=dict(
            boxstyle='round,pad=0.22',
            facecolor=COLORS[cat],
            alpha=0.88,
            edgecolor='white',
            linewidth=0.8,
        ),
    )
    texts.append(t)

# adjustText pour résoudre collisions résiduelles
adjust_text(
    texts,
    x=[a[3] for a in ACTORS],
    y=[a[4] for a in ACTORS],
    ax=ax,
    expand_text=(1.4, 1.6),
    expand_points=(1.6, 1.8),
    force_text=(0.8, 0.9),
    force_points=(0.5, 0.5),
    avoid_self=True,
    autoalign='xy',
    arrowprops=dict(arrowstyle='-', color='#999988', lw=0.7),
    min_arrow_len=8,
)

# ─────────────────────────────────────────────
# AXES
# ─────────────────────────────────────────────
ax.set_xlim(-1.05, 1.08)
ax.set_ylim(0.2, 9.4)

ax.set_xticks([-0.70, -0.35, 0.0, 0.35, 0.70])
ax.set_xticklabels(
    ['Offensif\npur', 'Offensif\nmodéré', 'Ambivalent', 'Défensif\nmodéré', 'Défenseur\npur'],
    fontsize=10, fontfamily=FONT, color='#333322',
)

ax.set_yticks(Y_TICKS)
ax.set_yticklabels(Y_LABELS, fontsize=9, fontfamily=FONT, color='#333322')
ax.yaxis.set_tick_params(length=0)

ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['left'].set_color('#BBBBAA')
ax.spines['bottom'].set_color('#BBBBAA')

ax.set_xlabel('Posture stratégique',
    fontsize=12, fontfamily=FONT, fontweight='bold', color='#2A2A1A', labelpad=10)
ax.set_ylabel('Chaîne nucléaire civile ciblée / concernée',
    fontsize=12, fontfamily=FONT, fontweight='bold', color='#2A2A1A', labelpad=12)

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
    ax.scatter([], [], s=150+intensity**2*25, color='#888877', alpha=0.75, label=lbl)

leg1 = ax.legend(
    handles=legend_cats,
    title="Catégorie d'acteur",
    title_fontsize=9, fontsize=8.5,
    loc='lower left', bbox_to_anchor=(0.0, 0.0),
    framealpha=0.94, edgecolor='#CCCCBB', facecolor='#FDFAF4',
    borderpad=0.9, labelspacing=0.5,
    prop={'family': FONT},
)
leg1.get_title().set_fontfamily(FONT)
ax.add_artist(leg1)

leg2 = ax.legend(
    title='Taille = intensité documentée',
    title_fontsize=9, fontsize=8.5,
    loc='lower right', bbox_to_anchor=(1.0, 0.0),
    framealpha=0.94, edgecolor='#CCCCBB', facecolor='#FDFAF4',
    borderpad=0.9, scatterpoints=1,
    prop={'family': FONT},
)
leg2.get_title().set_fontfamily(FONT)

# Note C7-C8 fusionnés
ax.text(
    0.0, 6.7, 'N.B. - C7-C8 regroupés : aucun acteur documenté\n'
    'ciblant spécifiquement le transport ou les cybersystèmes\ntransverses de façon isolée',
    ha='center', fontsize=7, fontfamily=FONT, style='italic', color='#888877',
    bbox=dict(boxstyle='round,pad=0.3', facecolor='#F5F5EE', alpha=0.8, edgecolor='#CCCCBB'),
    zorder=8,
)

# ─────────────────────────────────────────────
# TITRE & NOTES
# ─────────────────────────────────────────────
ax.set_title(
    'Positionnement des acteurs : posture stratégique × chaîne nucléaire civile (C1–C9)',
    fontsize=15, fontfamily=FONT, fontweight='bold', color='#1A1A1A', pad=14,
)
fig.text(
    0.5, 0.934,
    'Intensité documentée des activités, 2010–2026',
    ha='center', fontsize=11, fontfamily=FONT, style='italic', color='#444433',
)
fig.text(
    0.5, 0.005,
    'Sources : CISA AA22-083A, AA23-144A, AA24-038A — DOJ Akulov Indictment 2022 — '
    'Dragos XENOTIME/TRITON 2017 — ESET Industroyer — Zetter K. (2014) — '
    'NYT/Sanger (2016) — Mandiant 2022 — LPM 2013 art.22 — AIEA INFCIRC/225 — '
    'UKUSA Agreement. | C1-C9 : classification adaptée AIEA/NSS-17-T (2011). '
    'C7-C8 fusionnés : absence de ciblage isolé documenté.',
    ha='center', fontsize=7.0, fontfamily=FONT, style='italic', color='#555544',
)

plt.tight_layout(rect=[0, 0.04, 1, 0.93])

out_png = '/home/user/maison-m-dina/figures/figure2_matrix.png'
out_svg = '/home/user/maison-m-dina/figures/figure2_matrix.svg'
fig.savefig(out_png, dpi=300, bbox_inches='tight', facecolor=BG_COLOR)
fig.savefig(out_svg, format='svg', bbox_inches='tight', facecolor=BG_COLOR)
print("Figure 2 — OK")
plt.close()
