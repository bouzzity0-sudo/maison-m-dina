"""
Figure 6 — Chronologie institutionnelle cyber-nucléaire FR — ITERATION 4

Corrections :
- CHU 2021 supprimé (santé ≠ nucléaire)
- COMCYBER créé sept. 2016 ajouté
- Revue Stratégique Cyber 2018 ajoutée
- Parquet National Cyber (PNC) 2021 ajouté
- DOJ 2022 : Akulov (FSB C18 / HAVEX) + Gladkikh (CNIIHM / TRITON) séparés
- AA22-083A recadrée (ICS/energy sector advisory, pas attribution)
- NIS2 : directive UE, transposition FR en cours
- Deux-pistes : jalons FR (haut) / contexte international (bas)
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
# ÉVÉNEMENTS — deux pistes (FR haut / INT bas)
# (année, label, type, piste)
# piste 'FR'  → niveau positif  (jalons institutionnels français)
# piste 'INT' → niveau négatif  (contexte cyber international)
# ─────────────────────────────────────────────
EVENTS = [
    (2009.0, 'Création\nANSSI',                   'institution', 'FR'),
    (2011.0, 'AIEA NSS-17\nrecomm. cyber',          'doctrine',    'INT'),
    (2013.0, 'LPM art.22\nObligation OIV',          'doctrine',    'FR'),
    (2014.5, 'HAVEX\n(secteur nucléaire)',           'opération',   'INT'),
    (2016.5, 'CoSSeN\ncréé',                        'institution', 'FR'),
    (2016.9, 'COMCYBER\ncréé',                      'institution', 'FR'),
    (2017.3, 'TRITON / TRISIS\n(SIS industriel)',   'opération',   'INT'),
    (2018.0, 'Revue Stratégique\nCyber (RSC)',       'doctrine',    'FR'),
    (2021.0, 'PNC créé\n(Parquet cyber)',            'institution', 'FR'),
    (2022.2, 'DOJ Akulov\n(FSB C18 / HAVEX)',        'opération',   'INT'),
    (2022.5, 'DOJ Gladkikh\n(CNIIHM / TRITON)',      'opération',   'INT'),
    (2022.9, 'CISA AA22-083A\n(ICS energy sector)', 'doctrine',    'INT'),
    (2023.1, 'DGI n°320\n(janv. 2023)',             'doctrine',    'FR'),
    (2023.7, 'CISA AA23-144A\nVolt Typhoon OT',     'opération',   'INT'),
    (2024.1, 'Loi ASNR\n(fusion ASN+IRSN)',         'institution', 'FR'),
    (2024.6, 'CISA AA24-038A\nVolt Typhoon infra.', 'opération',   'INT'),
    (2025.0, 'ASNR\nopérationnelle',                'institution', 'FR'),
    (2025.6, 'NIS2 UE\n(transposition\nen cours FR)', 'doctrine',  'INT'),
]
EVENTS.sort(key=lambda e: e[0])

# ─────────────────────────────────────────────
# LEVELS — deux pistes : FR=positif, INT=négatif
# ─────────────────────────────────────────────
LEVELS = {
    2009.0:  2.4,   # ANSSI — FR haut
    2011.0: -1.8,   # AIEA NSS-17 — INT bas
    2013.0:  2.8,   # LPM — FR haut (majeur)
    2014.5: -2.4,   # HAVEX — INT bas
    2016.5:  1.6,   # CoSSeN — FR modéré
    2016.9:  2.6,   # COMCYBER — FR haut (4 mois après CoSSeN)
    2017.3: -2.2,   # TRITON — INT bas
    2018.0:  1.8,   # RSC — FR modéré
    2021.0:  2.2,   # PNC — FR haut
    2022.2: -2.6,   # DOJ Akulov — INT bas
    2022.5: -1.4,   # DOJ Gladkikh — INT bas modéré (distinct Akulov)
    2022.9: -2.0,   # AA22-083A — INT bas
    2023.1:  2.0,   # DGI n°320 — FR haut
    2023.7: -2.4,   # AA23-144A — INT bas
    2024.1:  1.6,   # ASNR loi — FR modéré
    2024.6: -1.8,   # AA24-038A — INT bas modéré
    2025.0:  2.6,   # ASNR opéra — FR haut
    2025.6: -2.8,   # NIS2 UE — INT bas (directive supranationale)
}

# ─────────────────────────────────────────────
# FIGURE
# ─────────────────────────────────────────────
fig, ax = plt.subplots(figsize=(28, 12))
fig.patch.set_facecolor(BG_COLOR)
ax.set_facecolor(BG_COLOR)

ax.axhline(0, color='#6D6D5A', lw=2.5, zorder=2)
ax.set_xlim(2008.2, 2027.2)
ax.set_ylim(-3.8, 4.0)

# ─── Bandes de piste ───
ax.axhspan(0.1, 3.8, alpha=0.07, color='#1A237E', zorder=0)    # FR track
ax.axhspan(-3.8, -0.1, alpha=0.06, color='#B71C1C', zorder=0)  # INT track

# Annotations de piste
ax.text(2008.35, 3.55, 'Piste FR — Jalons institutionnels français',
        ha='left', fontsize=8, fontfamily=FONT, style='italic',
        color='#1A237E', alpha=0.75, fontweight='bold')
ax.text(2008.35, -3.55, 'Piste INT — Contexte cyber international',
        ha='left', fontsize=8, fontfamily=FONT, style='italic',
        color='#B71C1C', alpha=0.75, fontweight='bold')

# ─── Bandes sémantiques ───
ax.axvspan(2012.5, 2016.2, alpha=0.07, color='#2E7D32', zorder=0)
ax.axvspan(2016.8, 2025.5, alpha=0.05, color='#B71C1C', zorder=0)
ax.text(2014.3, 3.68, 'Cadrage réglementaire', ha='center',
        fontsize=7.5, fontfamily=FONT, style='italic', color='#2E7D32', alpha=0.70)
ax.text(2021.2, 3.68, 'Intensification des opérations offensives documentées',
        ha='center', fontsize=7.5, fontfamily=FONT, style='italic', color='#B71C1C', alpha=0.70)

# ─── Ticks annuels + labels tous les 2 ans ───
for yr in range(2009, 2027):
    ax.plot(yr, 0, '|', color='#AAAAA0', ms=8, mew=1.4, zorder=3)

ax.set_xticks(range(2009, 2027, 2))
ax.set_xticklabels([str(y) for y in range(2009, 2027, 2)],
                   fontsize=10, fontfamily=FONT, color='#333322')
ax.tick_params(axis='x', length=0, pad=5)

# ─────────────────────────────────────────────
# TRACÉ DES ÉVÉNEMENTS
# ─────────────────────────────────────────────
for (yr, label, etype, piste) in EVENTS:
    lvl = LEVELS[yr]
    clr = COLORS[etype]

    # Tige
    y_start = 0.14 if lvl > 0 else -0.14
    ax.plot([yr, yr], [y_start, lvl * 0.86], color=clr, lw=1.1, alpha=0.55, zorder=3)

    # Marqueur sur la ligne de temps
    ax.plot(yr, 0, 'o', color=clr, ms=MARKER_SIZE, zorder=6, mew=1.8, mec='white')

    # Boîte label
    bbox_style = dict(
        boxstyle='round,pad=0.38',
        facecolor=clr,
        alpha=0.90,
        edgecolor='white',
        linewidth=1.3,
    )
    va = 'bottom' if lvl > 0 else 'top'
    y_text = lvl + (0.18 if lvl > 0 else -0.18)

    ax.text(
        yr, y_text, label,
        ha='center', va=va,
        fontsize=7.8, fontfamily=FONT, fontweight='bold',
        color='white',
        multialignment='center',
        linespacing=1.3,
        bbox=bbox_style,
        zorder=7,
    )

# ─── Flèche de fin ───
ax.annotate(
    '', xy=(2027.0, 0), xytext=(2026.4, 0),
    arrowprops=dict(arrowstyle='->', color='#6D6D5A', lw=2.2),
    zorder=5,
)
ax.text(2026.9, 0.38, '2026', fontsize=9, fontfamily=FONT,
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

# ─── Axes nettoyés ───
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
    '2009–2026 : jalons FR (haut) et contexte cyber international (bas)',
    ha='center', fontsize=11, fontfamily=FONT, style='italic', color='#444433',
)

note = (
    'Sources : Décret n°2009-834 (ANSSI) — AIEA NSS-17-T (2011) — Loi 2013-1168 LPM art.22 — '
    'ICS-CERT 2014 (HAVEX) — Décret CoSSeN n°2016-570 — Arrêté COMCYBER sept. 2016 — '
    'Dragos XENOTIME (TRITON/TRISIS 2017) — Revue Stratégique Cyber FR 2018 — '
    'Décret PNC 2021 — DOJ Akulov Indictment (FSB C18, HAVEX/Wolf Creek) mars 2022 — '
    'DOJ Gladkikh Indictment (CNIIHM, TRITON) mars 2022 — CISA AA22-083A (ICS energy advisory) — '
    'SGDSN DGI n°320 (janv. 2023) — CISA AA23-144A (Volt Typhoon OT) — '
    'Loi 2024-90 (ASNR) — CISA AA24-038A — Directive NIS2 UE 2022/2555, transposition FR en cours.'
)
fig.text(
    0.5, 0.004,
    note,
    ha='center', fontsize=7.0, fontfamily=FONT,
    style='italic', color='#555544',
)

plt.tight_layout(rect=[0, 0.04, 1, 0.93])

out_png = '/home/user/maison-m-dina/figures/figure6_timeline.png'
out_svg = '/home/user/maison-m-dina/figures/figure6_timeline.svg'
fig.savefig(out_png, dpi=300, bbox_inches='tight', facecolor=BG_COLOR)
fig.savefig(out_svg, format='svg', bbox_inches='tight', facecolor=BG_COLOR)
print("Figure 6 — OK (itération 4)")
plt.close()
