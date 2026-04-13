"""
Figure 6 — Chronologie institutionnelle cyber-nucléaire française
Timeline horizontale 2009–2026
Couleur par type : doctrine / institution / opération
"""
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import matplotlib.lines as mlines

BG_COLOR = '#F9F6EF'

# ─────────────────────────────────────────────
# PALETTE
# ─────────────────────────────────────────────
COLORS = {
    'institution': '#1A237E',   # bleu marine
    'doctrine':    '#2E7D32',   # vert foncé
    'opération':   '#B71C1C',   # rouge foncé
}
MARKER_SIZE = 12

# ─────────────────────────────────────────────
# ÉVÉNEMENTS (année, label, type, court)
# ─────────────────────────────────────────────
EVENTS = [
    # (année, label multiline, type, source courte)
    (2009.0,
     'Création\nde l\'ANSSI',
     'institution',
     'Décret n°2009-834'),

    (2011.0,
     'AIEA NSS-17\nrecommandations cyber',
     'doctrine',
     'AIEA NSS-17-T (2011)'),

    (2013.0,
     'LPM art.22\nObligation cybersécurité OIV',
     'doctrine',
     'Loi 2013-1168'),

    (2014.5,
     'HAVEX\n(attaque sectorielle)',
     'opération',
     'DOJ / ICS-CERT 2014'),

    (2015.0,
     'Décrets OIV\n(22 secteurs)',
     'doctrine',
     'Décrets 2015-349 ss.'),

    (2016.5,
     'CoSSeN\ncréé',
     'institution',
     'Décret 2016'),

    (2017.3,
     'TRITON/TRISIS\n(SIS industriel)',
     'opération',
     'Dragos XENOTIME'),

    (2019.0,
     'ANSSI Rapport\nmenaces sur OIV',
     'doctrine',
     'ANSSI Panorama 2019'),

    (2021.0,
     'Attaques\nCHU / hôpitaux FR',
     'opération',
     'ANSSI 2021'),

    (2022.2,
     'Inculpation Akulov\nHAVEX / Wolf Creek',
     'opération',
     'DOJ Akulov 2022'),

    (2022.8,
     'CISA AA22-083A\nattribution publique',
     'doctrine',
     'CISA 2022'),

    (2023.05,
     'DGI n°320\n(janv. 2023)',
     'doctrine',
     'SGDSN 2023 (classif.)'),

    (2023.6,
     'CISA AA23-144A\nVolt Typhoon OT',
     'doctrine',
     'CISA 2023'),

    (2024.1,
     'Loi créant l\'ASNR\n(fusion ASN+IRSN)',
     'institution',
     'Loi 2024-90'),

    (2024.5,
     'CISA AA24-038A\nVolt Typhoon infra.',
     'opération',
     'CISA 2024'),

    (2025.0,
     'ASNR\nopérationnelle',
     'institution',
     'Loi 2024-90 (applic.)'),

    (2025.5,
     'NIS2\ntransposition FR',
     'doctrine',
     'Dir. UE 2022/2555'),
]

# ─────────────────────────────────────────────
# ALTERNANCE haut / bas pour éviter les superpositions
# ─────────────────────────────────────────────
# Tri par année
EVENTS.sort(key=lambda e: e[0])

# Assignation des niveaux de façon à éviter les collisions temporelles
# On assigne manuellement selon densité
LEVELS = {
    2009.0:  2.2,
    2011.0: -2.0,
    2013.0:  3.5,
    2014.5: -3.2,
    2015.0:  1.8,
    2016.5: -1.8,
    2017.3:  3.0,
    2019.0: -3.5,
    2021.0:  2.5,
    2022.2: -2.5,
    2022.8:  1.5,
    2023.05:-1.5,
    2023.6:  3.2,
    2024.1: -3.0,
    2024.5:  2.0,
    2025.0: -2.2,
    2025.5:  3.8,
}

# ─────────────────────────────────────────────
# FIGURE
# ─────────────────────────────────────────────
fig, ax = plt.subplots(figsize=(24, 13))
fig.patch.set_facecolor(BG_COLOR)
ax.set_facecolor(BG_COLOR)

# Ligne temporelle principale
ax.axhline(0, color='#6D6D5A', lw=2.5, zorder=2)
ax.set_xlim(2008.2, 2027.0)
ax.set_ylim(-5.2, 5.5)

# Bandes de fond par type
# Fond léger pour la plage 2013-2015 (cadrage réglementaire)
ax.axvspan(2012.5, 2016.0, alpha=0.06, color='#2E7D32', zorder=0,
           label='_nolegend_')
# Fond pour la vague offensive 2017-2024
ax.axvspan(2016.8, 2024.8, alpha=0.05, color='#B71C1C', zorder=0,
           label='_nolegend_')

# Années sur l'axe X
for yr in range(2009, 2027):
    ax.plot(yr, 0, '|', color='#AAAAA0', ms=10, mew=1.5, zorder=3)
ax.set_xticks(range(2009, 2027))
ax.set_xticklabels(
    [str(y) for y in range(2009, 2027)],
    fontsize=9.5, fontfamily='P052', color='#333322',
    rotation=0,
)
ax.tick_params(axis='x', length=0, pad=4)

# ─────────────────────────────────────────────
# TRACÉ DES ÉVÉNEMENTS
# ─────────────────────────────────────────────
for (yr, label, etype, source) in EVENTS:
    lvl = LEVELS.get(yr, 2.0)
    clr = COLORS[etype]

    # Tige
    y_start = 0.12 if lvl > 0 else -0.12
    ax.plot([yr, yr], [y_start, lvl * 0.88], color=clr, lw=1.2,
            alpha=0.65, zorder=3)

    # Marqueur
    ax.plot(yr, 0, 'o', color=clr, ms=MARKER_SIZE,
            zorder=6, mew=1.5, mec='white')

    # Boîte étiquette
    bbox_style = dict(
        boxstyle='round,pad=0.35',
        facecolor=clr,
        alpha=0.88,
        edgecolor='white',
        linewidth=1.2,
    )
    va = 'bottom' if lvl > 0 else 'top'
    y_text = lvl + (0.15 if lvl > 0 else -0.15)

    ax.text(
        yr, y_text, label,
        ha='center', va=va,
        fontsize=7.5, fontfamily='P052', fontweight='bold',
        color='white',
        multialignment='center',
        linespacing=1.3,
        bbox=bbox_style,
        zorder=7,
    )

    # Source en dessous de la boîte
    y_src = lvl + (0.65 if lvl > 0 else -0.65)
    # Calcul approx de la hauteur de la boîte (nb lignes * hauteur)
    n_lines = label.count('\n') + 1
    box_h = n_lines * 0.55
    y_src = y_text + (box_h if lvl > 0 else -box_h)

    ax.text(
        yr, y_src, f'[{source}]',
        ha='center', va=va,
        fontsize=6.2, fontfamily='P052', style='italic',
        color=clr, alpha=0.85,
        zorder=7,
    )

# Flèche de fin
ax.annotate(
    '', xy=(2026.9, 0), xytext=(2026.4, 0),
    arrowprops=dict(arrowstyle='->', color='#6D6D5A', lw=2.0),
    zorder=5,
)
ax.text(2026.85, 0.25, '2026', fontsize=9, fontfamily='P052',
        color='#6D6D5A', fontweight='bold')

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
    title='Type d\'événement',
    title_fontsize=10,
    fontsize=9.5,
    loc='upper left',
    bbox_to_anchor=(0.0, 1.0),
    framealpha=0.93,
    edgecolor='#CCCCBB',
    facecolor='#FDFAF4',
    borderpad=0.8,
    labelspacing=0.6,
    prop={'family': 'P052'},
)

# Axe Y invisible (nettoyé)
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
    fontsize=16, fontfamily='P052', fontweight='bold',
    color='#1A1A1A', pad=14,
)
fig.text(
    0.5, 0.935,
    '2009–2026 : événements institutionnels, doctrinaux et opérationnels',
    ha='center', fontsize=11, fontfamily='P052', style='italic', color='#444433',
)

note = (
    'Sources : Décret n°2009-834 (ANSSI) — Loi 2013-1168 LPM art.22 — Décrets OIV 2015 — '
    'CoSSeN 2016 — Dragos XENOTIME (TRITON 2017) — DOJ Akulov Indictment 2022 — '
    'CISA AA22-083A, AA23-144A, AA24-038A — SGDSN DGI n°320 (janv. 2023, extraits) — '
    'Loi 2024-90 (ASNR) — Directive NIS2 UE 2022/2555.'
)
fig.text(
    0.5, 0.005,
    note,
    ha='center', fontsize=7.0, fontfamily='P052',
    style='italic', color='#555544',
)

plt.tight_layout(rect=[0, 0.04, 1, 0.93])

out_png = '/home/user/maison-m-dina/figures/figure6_timeline.png'
out_svg = '/home/user/maison-m-dina/figures/figure6_timeline.svg'
fig.savefig(out_png, dpi=300, bbox_inches='tight', facecolor=BG_COLOR)
fig.savefig(out_svg, format='svg', bbox_inches='tight', facecolor=BG_COLOR)
print(f"Figure 6 exportée : {out_png}  |  {out_svg}")
plt.close()
