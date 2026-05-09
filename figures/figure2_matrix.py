"""
Figure 2 — Matrice posture × territoire C1-C9 — ITERATION 4

Corrections :
- FSB Centre 18 (Unit 71330, DOJ 2022)
- APT10 et Volt Typhoon séparés (deux groupes chinois distincts)
- Lazarus et Kimsuky séparés (deux groupes RPDC distincts)
- EDF / Framatome / Orano séparés
- COMCYBER + DGA-MI ajoutés (piliers cyberdéfense FR)
- Formes distinctes par catégorie (v, s, D, ^, p, o)
- Labels directionnels manuels (adjustText retiré)
- C9 tick à Y=9 (bande plus large pour cluster doctrinal)
- Aucune confusion avec classification AIEA (C1-C9 = adaptation interne)
"""
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import matplotlib.lines as mlines

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

# Marker shape by category
MARKERS = {
    'offensif':   'v',   # triangle down = attack
    'proxy':      's',   # square = intermediary
    'ambivalent': 'D',   # diamond = dual
    'défenseur':  '^',   # triangle up = defense
    'normatif':   'p',   # pentagon = institution
    'opérateur':  'o',   # circle = civilian operator
}

# ─────────────────────────────────────────────
# CHAÎNES C1–C9 (C7+C8 fusionnés, C9 à Y=9)
# ─────────────────────────────────────────────
C_LABELS = {
    1: 'C1 — Mines\nd\'uranium',
    2: 'C2 — Conversion /\nenrichissement',
    3: 'C3 — Fabrication\ncombustible',
    4: 'C4 — Réacteur\nnucléaire',
    5: 'C5 — Réseau\nélectrique OT',
    6: 'C6 — Gestion\ndéchets',
    7: 'C7-C8 — Transport /\nCybersystèmes',
    9: 'C9 — Territoire\ndoctrinal',
}
Y_TICKS  = [1, 2, 3, 4, 5, 6, 7, 9]
Y_LABELS = [C_LABELS[i] for i in Y_TICKS]

# ─────────────────────────────────────────────
# ACTEURS — (id, label, catégorie, x, y, intensité, label_dir)
# x = posture stratégique  y = chaîne ciblée/concernée
# label_dir : L=gauche R=droite U=haut D=bas
# ─────────────────────────────────────────────
ACTORS = [
    # Offensifs (x < -0.5, label → L)
    ('FSB_C18',  'FSB Centre 18\n(Unit 71330)',      'offensif',   -0.84, 4.6, 9, 'L'),
    ('GRU_SW',   'GRU Sandworm\n(Unit 74455)',       'offensif',   -0.78, 5.2, 9, 'L'),
    ('APT10',    'APT10\n(MSS / Stone Panda)',        'offensif',   -0.72, 3.0, 7, 'L'),
    ('VoltT',    'Volt Typhoon\n(Bronze Silhouette)', 'offensif',   -0.76, 5.6, 8, 'L'),
    ('Lazarus',  'Lazarus Group\n(Bureau 121)',       'offensif',   -0.68, 8.4, 8, 'L'),
    ('Kimsuky',  'Kimsuky\n(RGB / Unité 180)',        'offensif',   -0.64, 2.2, 7, 'L'),
    ('APT33',    'APT33\n(IRGC-MOIS)',               'offensif',   -0.70, 4.2, 7, 'L'),
    # Proxy (x ≈ -0.5)
    ('KillNet',  'KillNet',                         'proxy',      -0.52, 5.9, 6, 'L'),
    ('TEMP_V',   'TEMP.Veles\n(CNIIHM)',             'proxy',      -0.56, 4.0, 8, 'L'),
    # Ambivalents — X différenciés
    ('NSA_CIA',  'NSA / CIA\n(USA)',                 'ambivalent', -0.12, 7.8,10, 'L'),
    ('Unit8200', 'Unit 8200\n(AMAN, Israël)',         'ambivalent',  0.02, 2.4, 8, 'R'),
    ('DGSE_LIO', 'DGSE / LIO\n(France)',             'ambivalent',  0.09, 8.6, 6, 'R'),
    # Défenseurs (x > 0.5, label → R ou L alterné)
    ('DGA_MI',   'DGA-MI\n(Rennes)',                'défenseur',   0.60, 7.2, 6, 'L'),
    ('COMCYBER', 'COMCYBER\n(France)',              'défenseur',   0.66, 7.6, 8, 'L'),
    ('ANSSI',    'ANSSI /\nCERT-FR',               'défenseur',   0.74, 8.1, 8, 'R'),
    ('CISA',     'CISA / NSA\ndéfensif',            'défenseur',   0.82, 8.5, 9, 'L'),
    ('GCHQ',     'GCHQ\n(NCSC UK)',                'défenseur',   0.86, 9.0, 7, 'R'),
    ('FiveEyes', 'Five Eyes',                       'défenseur',   0.90, 9.5, 9, 'L'),
    # Normatif
    ('AIEA',     'AIEA',                            'normatif',    0.70, 9.8, 7, 'R'),
    # Opérateurs FR séparés
    ('EDF',      'EDF\n(exploitation)',             'opérateur',   0.14, 4.4, 7, 'R'),
    ('Framatome','Framatome\n(équipements)',         'opérateur',   0.20, 3.2, 6, 'R'),
    ('Orano',    'Orano\n(cycle combustible)',       'opérateur',   0.10, 1.7, 6, 'R'),
]

# ─────────────────────────────────────────────
# OFFSETS LABELS (en coordonnées data)
# ─────────────────────────────────────────────
OFFSETS_MAP = {'L': (-0.055, 0.0), 'R': (0.055, 0.0),
               'U': (0.0, 0.30),   'D': (0.0, -0.30)}
HA_MAP = {'L': 'right', 'R': 'left', 'U': 'center', 'D': 'center'}
VA_MAP = {'L': 'center', 'R': 'center', 'U': 'bottom', 'D': 'top'}

# ─────────────────────────────────────────────
# FIGURE
# ─────────────────────────────────────────────
fig, ax = plt.subplots(figsize=(20, 14))
fig.patch.set_facecolor(BG_COLOR)
ax.set_facecolor(BG_COLOR)

# Zones de fond (posture)
ax.axvspan(-1.10, -0.35, color='#FDECEA', alpha=0.50, zorder=0)
ax.axvspan(-0.35,  0.35, color='#F3E5FF', alpha=0.35, zorder=0)
ax.axvspan( 0.35,  1.12, color='#E8F5E9', alpha=0.50, zorder=0)

# Bande C9 territoire doctrinal
ax.axhspan(7.0, 10.6, color='#E3F2FD', alpha=0.25, zorder=0)
ax.text(-1.08, 10.3, 'Territoire doctrinal / institutionnel (C9)',
        ha='left', fontsize=7.5, fontfamily=FONT, style='italic',
        color='#1A237E', alpha=0.65, zorder=1)

# Lignes horizontales des chaînes
for c in Y_TICKS:
    ax.axhline(c, color='#D5D0C4', lw=0.6, zorder=1, alpha=0.7)

# Séparateurs verticaux
ax.axvline(-0.35, color='#BBBBAA', lw=0.8, linestyle='--', zorder=1, alpha=0.7)
ax.axvline( 0.35, color='#BBBBAA', lw=0.8, linestyle='--', zorder=1, alpha=0.7)
ax.axvline( 0.0,  color='#CCCCBB', lw=0.5, linestyle=':',  zorder=1, alpha=0.5)

# ─── Bulles + Labels ───
for (aid, label, cat, px, py, intensity, ldir) in ACTORS:
    size = 160 + intensity**2 * 24
    marker = MARKERS[cat]
    ax.scatter(
        px, py, s=size,
        color=COLORS[cat],
        marker=marker,
        alpha=0.88,
        edgecolors='white',
        linewidths=1.8,
        zorder=5,
    )
    dx, dy = OFFSETS_MAP[ldir]
    lx, ly = px + dx, py + dy
    ax.text(
        lx, ly, label,
        fontsize=7.4, fontfamily=FONT, fontweight='bold',
        ha=HA_MAP[ldir], va=VA_MAP[ldir], color='white',
        multialignment='center', linespacing=1.2, zorder=10,
        bbox=dict(
            boxstyle='round,pad=0.22',
            facecolor=COLORS[cat],
            alpha=0.90,
            edgecolor='white',
            linewidth=0.8,
        ),
    )

# ─────────────────────────────────────────────
# AXES
# ─────────────────────────────────────────────
ax.set_xlim(-1.14, 1.14)
ax.set_ylim(0.3, 10.8)

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
# NOTE C7-C8 fusionnés
# ─────────────────────────────────────────────
ax.text(
    0.0, 6.62, 'N.B. — C7-C8 regroupés : aucun acteur documenté\n'
    'ciblant spécifiquement transport ou cybersystèmes\ntransverses de façon isolée',
    ha='center', fontsize=7, fontfamily=FONT, style='italic', color='#888877',
    bbox=dict(boxstyle='round,pad=0.3', facecolor='#F5F5EE', alpha=0.85, edgecolor='#CCCCBB'),
    zorder=8,
)

# ─────────────────────────────────────────────
# LÉGENDE CATÉGORIES + FORMES
# ─────────────────────────────────────────────
def make_marker_handle(cat):
    return mlines.Line2D([], [],
        color=COLORS[cat], marker=MARKERS[cat],
        linestyle='None', markersize=10, mew=1.5, mec='white',
        label={
            'offensif':   'Acteur offensif hostile',
            'proxy':      'Proxy / contractor étatique',
            'ambivalent': 'Ambivalent (offensif & défenseur)',
            'défenseur':  'Défenseur institutionnel',
            'normatif':   'Acteur normatif international',
            'opérateur':  'Opérateur nucléaire civil',
        }[cat]
    )

legend_handles = [make_marker_handle(c) for c in
    ['offensif','proxy','ambivalent','défenseur','normatif','opérateur']]

leg1 = ax.legend(
    handles=legend_handles,
    title="Catégorie (forme = type)",
    title_fontsize=9, fontsize=8.5,
    loc='lower left', bbox_to_anchor=(0.0, 0.0),
    framealpha=0.94, edgecolor='#CCCCBB', facecolor='#FDFAF4',
    borderpad=0.9, labelspacing=0.5,
    prop={'family': FONT},
)
leg1.get_title().set_fontfamily(FONT)
ax.add_artist(leg1)

# Légende intensité
for intensity, lbl in [(5, 'Intensité 5 (modérée)'), (9, 'Intensité 9 (élevée)')]:
    ax.scatter([], [], s=160+intensity**2*24, color='#888877', alpha=0.75, label=lbl)
leg2 = ax.legend(
    title='Taille = intensité documentée',
    title_fontsize=9, fontsize=8.5,
    loc='lower right', bbox_to_anchor=(1.0, 0.0),
    framealpha=0.94, edgecolor='#CCCCBB', facecolor='#FDFAF4',
    borderpad=0.9, scatterpoints=1,
    prop={'family': FONT},
)
leg2.get_title().set_fontfamily(FONT)

# ─────────────────────────────────────────────
# TITRE & NOTES
# ─────────────────────────────────────────────
ax.set_title(
    'Positionnement des acteurs : posture stratégique × chaîne nucléaire civile (C1–C9)',
    fontsize=15, fontfamily=FONT, fontweight='bold', color='#1A1A1A', pad=14,
)
fig.text(
    0.5, 0.934,
    'Intensité documentée des activités, 2010–2026 | Itération 4',
    ha='center', fontsize=11, fontfamily=FONT, style='italic', color='#444433',
)
fig.text(
    0.5, 0.005,
    'Sources : DOJ Akulov 2022 (FSB C18, HAVEX) — CISA AA23-144A/AA24-038A (Volt Typhoon OT) — '
    'NCSC/DoJ 2018 (APT10 / MSS) — Zetter K. 2014 (Stuxnet/Natanz, Unit 8200) — '
    'Dragos XENOTIME (TRITON/CNIIHM) — CISA AA22-011A (Lazarus énergie) — '
    'HHS/DHS 2020 (Kimsuky enrichissement) — LPM 2013 art.22 — AIEA INFCIRC/225 Rev.5 — UKUSA Agreement. '
    '| C1-C9 : classification adaptée AIEA/NSS-17-T (2011). C7-C8 fusionnés : absence ciblage isolé documenté.',
    ha='center', fontsize=7.0, fontfamily=FONT, style='italic', color='#555544',
)

plt.tight_layout(rect=[0, 0.04, 1, 0.93])

out_png = '/home/user/maison-m-dina/figures/figure2_matrix.png'
out_svg = '/home/user/maison-m-dina/figures/figure2_matrix.svg'
fig.savefig(out_png, dpi=300, bbox_inches='tight', facecolor=BG_COLOR)
fig.savefig(out_svg, format='svg', bbox_inches='tight', facecolor=BG_COLOR)
print("Figure 2 — OK (itération 4)")
plt.close()
