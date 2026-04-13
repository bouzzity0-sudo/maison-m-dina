"""
Figure 6 — Chronologie institutionnelle cyber-nucléaire FR — ITERATION 3
Corrections : bug sources supprimé (sources consolidées en note),
axe X allégé (tous les 2 ans), LEVELS recalculés pour éviter collisions,
y_max réduit à ±3.2, annotation 2026 déplacée.
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
    'institution': '#1A237E',
    'doctrine':    '#2E7D32',
    'opération':   '#B71C1C',
}
MARKER_SIZE = 13

# ─────────────────────────────────────────────
# ÉVÉNEMENTS (année, label, type)
# Sources supprimées des labels — consolidées en note de bas
# ─────────────────────────────────────────────
EVENTS = [
    (2009.0, 'Création\nde l\'ANSSI',               'institution'),
    (2011.0, 'AIEA NSS-17\nrecomm. cyber',           'doctrine'),
    (2013.0, 'LPM art.22\nObligation OIV',           'doctrine'),
    (2014.5, 'HAVEX\n(secteur nucléaire)',            'opération'),
    (2015.0, 'Décrets OIV\n(22 secteurs)',            'doctrine'),
    (2016.5, 'CoSSeN\ncréé',                         'institution'),
    (2017.3, 'TRITON / TRISIS\n(SIS industriel)',    'opération'),
    (2019.0, 'ANSSI Panorama\nmenaces OIV',           'doctrine'),
    (2021.0, 'Attaques CHU\n(vague ransomware)',      'opération'),
    (2022.2, 'Inculpation Akulov\n(HAVEX/Wolf Crk)', 'opération'),
    (2022.8, 'CISA AA22-083A\nattribution publique', 'doctrine'),
    (2023.1, 'DGI n°320\n(janv. 2023)',              'doctrine'),
    (2023.7, 'CISA AA23-144A\nVolt Typhoon OT',      'doctrine'),
    (2024.1, 'Loi ASNR\n(fusion ASN+IRSN)',          'institution'),
    (2024.6, 'CISA AA24-038A\nVolt Typhoon infra.',  'opération'),
    (2025.0, 'ASNR\nopérationnelle',                 'institution'),
    (2025.6, 'NIS2\ntransposition FR',               'doctrine'),
]
EVENTS.sort(key=lambda e: e[0])

# ─────────────────────────────────────────────
# LEVELS recalculés — éviter collisions zone 2022-2025
# Contrainte : |lvl| ≤ 3.2, alternance haut/bas, espacement ≥ 0.9 entre
# événements simultanés proches (< 0.8 an)
# ─────────────────────────────────────────────
LEVELS = {
    2009.0:  2.4,
    2011.0: -1.8,
    2013.0:  2.8,
    2014.5: -2.5,
    2015.0:  1.6,
    2016.5: -1.6,
    2017.3:  2.4,
    2019.0: -2.2,
    2021.0:  2.0,
    2022.2: -2.6,   # Akulov — bas
    2022.8:  1.4,   # AA22-083A — haut modéré (distinct de Akulov)
    2023.1: -1.4,   # DGI n°320 — bas modéré
    2023.7:  2.6,   # AA23-144A — haut (distinct de DGI)
    2024.1: -2.8,   # ASNR loi — bas
    2024.6:  1.8,   # AA24-038A — haut modéré
    2025.0: -2.0,   # ASNR opéra — bas modéré
    2025.6:  3.0,   # NIS2 — haut (dernier jalon doctrinal majeur)
}

# ─────────────────────────────────────────────
# FIGURE
# ─────────────────────────────────────────────
fig, ax = plt.subplots(figsize=(26, 12))
fig.patch.set_facecolor(BG_COLOR)
ax.set_facecolor(BG_COLOR)

# Ligne temporelle
ax.axhline(0, color='#6D6D5A', lw=2.5, zorder=2)
ax.set_xlim(2008.2, 2027.2)
ax.set_ylim(-4.0, 4.4)

# Bandes sémantiques
ax.axvspan(2012.5, 2016.2, alpha=0.06, color='#2E7D32', zorder=0)   # cadrage réglementaire
ax.axvspan(2017.0, 2025.2, alpha=0.05, color='#B71C1C', zorder=0)   # vague offensive

# Annotation des bandes
ax.text(2014.3, 3.8, 'Cadrage réglementaire', ha='center',
        fontsize=7.5, fontfamily=FONT, style='italic', color='#2E7D32', alpha=0.7)
ax.text(2021.0, 3.8, 'Intensification des opérations offensives documentées',
        ha='center', fontsize=7.5, fontfamily=FONT, style='italic', color='#B71C1C', alpha=0.7)

# Ticks annuels fins + labels tous les 2 ans
for yr in range(2009, 2027):
    ax.plot(yr, 0, '|', color='#AAAAA0', ms=8, mew=1.4, zorder=3)

ax.set_xticks(range(2009, 2027, 2))
ax.set_xticklabels(
    [str(y) for y in range(2009, 2027, 2)],
    fontsize=10, fontfamily=FONT, color='#333322',
)
ax.tick_params(axis='x', length=0, pad=5)

# ─────────────────────────────────────────────
# TRACÉ DES ÉVÉNEMENTS
# ─────────────────────────────────────────────
for (yr, label, etype) in EVENTS:
    lvl = LEVELS[yr]
    clr = COLORS[etype]

    # Tige
    y_start = 0.14 if lvl > 0 else -0.14
    ax.plot([yr, yr], [y_start, lvl * 0.88], color=clr, lw=1.1, alpha=0.6, zorder=3)

    # Marqueur sur la ligne
    ax.plot(yr, 0, 'o', color=clr, ms=MARKER_SIZE, zorder=6, mew=1.8, mec='white')

    # Boîte label
    bbox_style = dict(
        boxstyle='round,pad=0.38',
        facecolor=clr,
        alpha=0.90,
        edgecolor='white',
        linewidth=1.3,
    )
    va  = 'bottom' if lvl > 0 else 'top'
    y_text = lvl + (0.18 if lvl > 0 else -0.18)

    ax.text(
        yr, y_text, label,
        ha='center', va=va,
        fontsize=8.0, fontfamily=FONT, fontweight='bold',
        color='white',
        multialignment='center',
        linespacing=1.3,
        bbox=bbox_style,
        zorder=7,
    )

# Flèche de fin
ax.annotate(
    '', xy=(2027.0, 0), xytext=(2026.4, 0),
    arrowprops=dict(arrowstyle='->', color='#6D6D5A', lw=2.2),
    zorder=5,
)
ax.text(2026.95, 0.35, '2026', fontsize=9, fontfamily=FONT,
        color='#6D6D5A', fontweight='bold', ha='right')

# ─────────────────────────────────────────────
# LÉGENDE
# ─────────────────────────────────────────────
legend_h = [
    mpatches.Patch(facecolor=COLORS['institution'], label='Création institutionnelle'),
    mpatches.Patch(facecolor=COLORS['doctrine'],    label='Texte doctrinal / réglementaire'),
    mpatches.Patch(facecolor=COLORS['opération'],   label='Opération cyber documentée'),
]
ax.legend(
    handles=legend_h,
    title="Type d'événement",
    title_fontsize=10,
    fontsize=9.5,
    loc='upper left',
    bbox_to_anchor=(0.0, 1.0),
    framealpha=0.93,
    edgecolor='#CCCCBB',
    facecolor='#FDFAF4',
    borderpad=0.9,
    labelspacing=0.65,
    prop={'family': FONT},
)

# Axes nettoyés
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['left'].set_visible(False)
ax.spines['bottom'].set_visible(False)
ax.set_yticks([])

# ─────────────────────────────────────────────
# TITRE & NOTES
# ─────────────────────────────────────────────
ax.set_title(
    'Chronologie institutionnelle de la cybersécurité nucléaire civile française',
    fontsize=16, fontfamily=FONT, fontweight='bold', color='#1A1A1A', pad=14,
)
fig.text(
    0.5, 0.935,
    '2009–2026 : créations institutionnelles, textes doctrinaux et opérations cyber documentées',
    ha='center', fontsize=11, fontfamily=FONT, style='italic', color='#444433',
)

note = (
    'Sources : Décret n°2009-834 (ANSSI) — AIEA NSS-17-T (2011) — '
    'Loi 2013-1168 LPM art.22 — ICS-CERT 2014 (HAVEX) — Décrets OIV 2015 — '
    'Décret CoSSeN 2016 — Dragos XENOTIME (TRITON 2017) — ANSSI Panorama 2019 — '
    'DOJ Akulov Indictment 2022 — CISA AA22-083A, AA23-144A, AA24-038A — '
    'SGDSN DGI n°320 (janv. 2023, extraits publics) — Loi 2024-90 (ASNR) — '
    'Directive NIS2 UE 2022/2555, transposition FR 2024-2025.'
)
fig.text(
    0.5, 0.004,
    note,
    ha='center', fontsize=7.2, fontfamily=FONT,
    style='italic', color='#555544',
)

plt.tight_layout(rect=[0, 0.04, 1, 0.93])

out_png = '/home/user/maison-m-dina/figures/figure6_timeline.png'
out_svg = '/home/user/maison-m-dina/figures/figure6_timeline.svg'
fig.savefig(out_png, dpi=300, bbox_inches='tight', facecolor=BG_COLOR)
fig.savefig(out_svg, format='svg', bbox_inches='tight', facecolor=BG_COLOR)
print("Figure 6 — OK")
plt.close()
