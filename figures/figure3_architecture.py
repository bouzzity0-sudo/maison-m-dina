"""
Figure 3 — Architecture institutionnelle française — ITERATION 3
Corrections : timeline simplifiée (6 jalons, points ms=14), interstice labels
fontsize 9 + fond blanc, flèches présidentielles en barre horizontale,
CDSN comme boîte distincte, annotation niveaux hiérarchiques.
"""
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch
import matplotlib.patheffects as pe

BG_COLOR = '#F9F6EF'
FONT = 'P052'

CHAIN_COLORS = {
    'SGDSN':  '#1A237E',
    'ASNR':   '#1B5E20',
    'CoSSeN': '#4A148C',
    'Rens':   '#B71C1C',
}
INTERSTICE_COLOR = '#C62828'

fig = plt.figure(figsize=(22, 16))
fig.patch.set_facecolor(BG_COLOR)
ax = fig.add_axes([0.04, 0.15, 0.92, 0.78])
ax.set_facecolor(BG_COLOR)
ax.set_xlim(0, 22)
ax.set_ylim(0, 16)
ax.axis('off')

# ─────────────────────────────────────────────
# HELPERS
# ─────────────────────────────────────────────
def draw_box(ax, x, y, w, h, label, sublabel=None,
             facecolor='#1A237E', alpha=0.88, fontsize=9):
    box = FancyBboxPatch(
        (x, y), w, h,
        boxstyle='round,pad=0.08',
        facecolor=facecolor, edgecolor='white',
        linewidth=1.6, alpha=alpha, zorder=5,
    )
    ax.add_patch(box)
    cy = y + h / 2 + (0.12 if sublabel else 0)
    ax.text(
        x + w / 2, cy, label,
        ha='center', va='center',
        fontsize=fontsize, fontfamily=FONT, fontweight='bold',
        color='white', zorder=6,
        multialignment='center',
        path_effects=[pe.withStroke(linewidth=1.5, foreground='#00000055')],
    )
    if sublabel:
        ax.text(
            x + w / 2, y + h / 2 - 0.28, sublabel,
            ha='center', va='center',
            fontsize=fontsize - 1.5, fontfamily=FONT, style='italic',
            color='#FFFFFFBB', zorder=6,
            multialignment='center',
        )

def draw_arrow(ax, x1, y1, x2, y2, color='#555544', lw=1.4):
    ax.annotate(
        '', xy=(x2, y2), xytext=(x1, y1),
        arrowprops=dict(arrowstyle='->', color=color, lw=lw),
        zorder=7,
    )

def draw_interstice(ax, x, y, w, h, label):
    rect = mpatches.Rectangle(
        (x, y), w, h,
        facecolor=INTERSTICE_COLOR,
        alpha=0.12,
        edgecolor=INTERSTICE_COLOR,
        linewidth=1.5,
        linestyle='--',
        hatch='///',
        zorder=4,
    )
    ax.add_patch(rect)
    # Label avec fond blanc semi-transparent pour lisibilité
    ax.text(
        x + w / 2, y + h + 0.12,
        label,
        ha='center', va='bottom',
        fontsize=9.0, fontfamily=FONT, color=INTERSTICE_COLOR,
        fontweight='bold', style='italic', zorder=8,
        bbox=dict(
            boxstyle='round,pad=0.25',
            facecolor='white', alpha=0.85,
            edgecolor=INTERSTICE_COLOR, linewidth=0.8,
        ),
    )

# ─────────────────────────────────────────────
# EN-TÊTE — PRÉSIDENT + CDSN comme boîtes distinctes
# ─────────────────────────────────────────────
draw_box(ax, 7.8, 14.9, 6.4, 0.85, 'PRÉSIDENT DE LA RÉPUBLIQUE',
         facecolor='#3E3E3A', alpha=0.92, fontsize=10.5)

draw_box(ax, 7.4, 13.8, 7.2, 0.80,
         'Conseil de Défense et de Sécurité Nationale (CDSN)',
         facecolor='#6D6D5A', alpha=0.75, fontsize=9.0)

# Flèche PRÉSIDENT → CDSN
draw_arrow(ax, 11.0, 14.9, 11.0, 14.6, color='#555544', lw=1.4)

# Barre horizontale de distribution (Itération 3 : pas de diagonales entrecroisées)
# CDSN → barre horizontale à y=13.4, puis flèches verticales vers chaque chaîne
BAR_Y = 13.35
draw_arrow(ax, 11.0, 13.8, 11.0, 13.45, color='#666655', lw=1.4)
ax.plot([2.5, 19.1], [BAR_Y, BAR_Y], color='#666655', lw=1.2, zorder=4)
for xc in [2.5, 7.5, 12.9, 18.5]:
    draw_arrow(ax, xc, BAR_Y, xc, 13.2 + 0.05, color='#666655', lw=1.2)

# ─────────────────────────────────────────────
# ANNOTATION NIVEAUX HIÉRARCHIQUES (marge gauche)
# ─────────────────────────────────────────────
LEVEL_LABELS = [
    (12.7, 'Direction /\nMinistère'),
    (11.5, 'Agence /\nAutorité'),
    (10.3, 'Service\nopérationnel'),
    ( 8.5, 'Capacité\nactivée'),
]
for y_pos, lbl in LEVEL_LABELS:
    ax.text(0.1, y_pos, lbl, ha='left', va='center',
            fontsize=7, fontfamily=FONT, style='italic', color='#888877',
            bbox=dict(boxstyle='round,pad=0.18', facecolor='#F0EDE5',
                      alpha=0.7, edgecolor='#CCCCBB', linewidth=0.6))

# ─────────────────────────────────────────────
# CHAÎNE 1 — SGDSN / ANSSI
# ─────────────────────────────────────────────
C1X = 0.4
draw_box(ax, C1X, 12.3, 4.2, 0.85, 'SGDSN',
         sublabel='Secrétariat général défense\net sécurité nationale',
         facecolor=CHAIN_COLORS['SGDSN'], fontsize=8.5)
draw_arrow(ax, C1X+2.1, 12.3, C1X+2.1, 11.45, color=CHAIN_COLORS['SGDSN'])
draw_box(ax, C1X, 10.5, 4.2, 0.85, 'ANSSI',
         sublabel='Agence nationale sécurité\ndes systèmes d\'information',
         facecolor=CHAIN_COLORS['SGDSN'], fontsize=8.5)
draw_arrow(ax, C1X+2.1, 10.5, C1X+2.1, 9.65, color=CHAIN_COLORS['SGDSN'])
draw_box(ax, C1X, 8.8, 4.2, 0.80, 'CERT-FR',
         sublabel='Centre gouvernemental\nde veille et réponse',
         facecolor=CHAIN_COLORS['SGDSN'], alpha=0.75, fontsize=8.5)
draw_arrow(ax, C1X+2.1, 8.8, C1X+2.1, 7.95, color=CHAIN_COLORS['SGDSN'])
draw_box(ax, C1X, 7.1, 4.2, 0.80, 'OIV Nucléaires',
         sublabel='Qualification LPM 2013 art.22\nObligations SSI sectorielles',
         facecolor=CHAIN_COLORS['SGDSN'], alpha=0.65, fontsize=8.0)

ax.text(C1X+2.1, 13.4, 'SGDSN / ANSSI', ha='center', fontsize=10,
        fontfamily=FONT, fontweight='bold', color=CHAIN_COLORS['SGDSN'])
ax.text(C1X+2.1, 13.1, 'Pilotage cyber & qualification OIV',
        ha='center', fontsize=7.5, fontfamily=FONT, style='italic', color='#444433')

# ─────────────────────────────────────────────
# CHAÎNE 2 — ASNR
# ─────────────────────────────────────────────
C2X = 5.6
draw_box(ax, C2X, 12.3, 4.0, 0.85, 'ASNR',
         sublabel='Autorité sûreté nucléaire\net radioprotection (2025)',
         facecolor=CHAIN_COLORS['ASNR'], fontsize=8.5)
draw_arrow(ax, C2X+2.0, 12.3, C2X+2.0, 11.45, color=CHAIN_COLORS['ASNR'])
draw_box(ax, C2X, 10.5, 4.0, 0.85, 'ASN (ex)',
         sublabel='Autorité de sûreté\nnucléaire (—2024)',
         facecolor=CHAIN_COLORS['ASNR'], alpha=0.65, fontsize=8.5)
draw_arrow(ax, C2X+2.0, 10.5, C2X+2.0, 9.65, color=CHAIN_COLORS['ASNR'])
draw_box(ax, C2X, 8.8, 4.0, 0.80, 'IRSN (ex)',
         sublabel='Institut radioprotection\net sûreté nucl. (—2024)',
         facecolor=CHAIN_COLORS['ASNR'], alpha=0.65, fontsize=8.5)
draw_arrow(ax, C2X+2.0, 8.8, C2X+2.0, 7.95, color=CHAIN_COLORS['ASNR'])
draw_box(ax, C2X, 7.1, 4.0, 0.80, 'Prescriptions\ncyber sûreté',
         sublabel='Guides techniques\n(non contraignants pré-2025)',
         facecolor=CHAIN_COLORS['ASNR'], alpha=0.60, fontsize=8.0)

ax.text(C2X+2.0, 13.4, 'ASNR', ha='center', fontsize=10,
        fontfamily=FONT, fontweight='bold', color=CHAIN_COLORS['ASNR'])
ax.text(C2X+2.0, 13.1, 'Sûreté nucléaire & radioprotection',
        ha='center', fontsize=7.5, fontfamily=FONT, style='italic', color='#444433')

# ─────────────────────────────────────────────
# CHAÎNE 3 — CoSSeN / PSPG
# ─────────────────────────────────────────────
C3X = 10.7
draw_box(ax, C3X, 12.3, 4.2, 0.85, 'CoSSeN',
         sublabel='Comité stratégique sécurité\nnucléaire (2016)',
         facecolor=CHAIN_COLORS['CoSSeN'], fontsize=8.5)
draw_arrow(ax, C3X+2.1, 12.3, C3X+2.1, 11.45, color=CHAIN_COLORS['CoSSeN'])
draw_box(ax, C3X, 10.5, 4.2, 0.85, 'PSPG',
         sublabel='Peloton spécialisé protection\ngendarmerie (sites EDF)',
         facecolor=CHAIN_COLORS['CoSSeN'], fontsize=8.5)
draw_arrow(ax, C3X+2.1, 10.5, C3X+2.1, 9.65, color=CHAIN_COLORS['CoSSeN'])
draw_box(ax, C3X, 8.8, 4.2, 0.80, 'DGI n°320',
         sublabel='Directive gouvernementale\njanvier 2023',
         facecolor=CHAIN_COLORS['CoSSeN'], alpha=0.75, fontsize=8.5)
draw_arrow(ax, C3X+2.1, 8.8, C3X+2.1, 7.95, color=CHAIN_COLORS['CoSSeN'])
draw_box(ax, C3X, 7.1, 4.2, 0.80, 'Sécurité physique\nsites nucléaires',
         sublabel='Zones protégées / vitales\n(Code défense)',
         facecolor=CHAIN_COLORS['CoSSeN'], alpha=0.65, fontsize=8.0)

ax.text(C3X+2.1, 13.4, 'CoSSeN / PSPG', ha='center', fontsize=10,
        fontfamily=FONT, fontweight='bold', color=CHAIN_COLORS['CoSSeN'])
ax.text(C3X+2.1, 13.1, 'Sécurité physique & doctrine',
        ha='center', fontsize=7.5, fontfamily=FONT, style='italic', color='#444433')

# ─────────────────────────────────────────────
# CHAÎNE 4 — DGSI / DGSE / Renseignement
# ─────────────────────────────────────────────
C4X = 16.0
draw_box(ax, C4X, 12.3, 4.2, 0.85, 'DGSI',
         sublabel='Direction générale\nsécurité intérieure',
         facecolor=CHAIN_COLORS['Rens'], fontsize=8.5)
draw_arrow(ax, C4X+2.1, 12.3, C4X+2.1, 11.45, color=CHAIN_COLORS['Rens'])
draw_box(ax, C4X, 10.5, 4.2, 0.85, 'DGSE',
         sublabel='Direction générale\nsécurité extérieure',
         facecolor=CHAIN_COLORS['Rens'], fontsize=8.5)
draw_arrow(ax, C4X+2.1, 10.5, C4X+2.1, 9.65, color=CHAIN_COLORS['Rens'])
draw_box(ax, C4X, 8.8, 4.2, 0.80, 'LIO',
         sublabel='Lutte informatique\noffensive (classifié)',
         facecolor=CHAIN_COLORS['Rens'], alpha=0.75, fontsize=8.5)
draw_arrow(ax, C4X+2.1, 8.8, C4X+2.1, 7.95, color=CHAIN_COLORS['Rens'])
draw_box(ax, C4X, 7.1, 4.2, 0.80, 'Attribution\nstratégique',
         sublabel='Processus interministériel\n(SGDSN coordination)',
         facecolor=CHAIN_COLORS['Rens'], alpha=0.65, fontsize=8.0)

ax.text(C4X+2.1, 13.4, 'DGSI / DGSE / LIO', ha='center', fontsize=10,
        fontfamily=FONT, fontweight='bold', color=CHAIN_COLORS['Rens'])
ax.text(C4X+2.1, 13.1, 'Renseignement & contre-ingérence',
        ha='center', fontsize=7.5, fontfamily=FONT, style='italic', color='#444433')

# ─────────────────────────────────────────────
# OPÉRATEURS
# ─────────────────────────────────────────────
draw_box(ax, 3.5, 5.5, 14.5, 0.88,
         'EDF / Framatome / Orano — CYCLIFE / CEA',
         sublabel='Opérateurs nucléaires civils — OIV soumis LPM art.22 et prescriptions ASNR',
         facecolor='#546E7A', fontsize=9.5)

for (xs, xd) in [(C1X+2.1,5.0),(C2X+2.0,8.5),(C3X+2.1,12.0),(C4X+2.1,16.5)]:
    draw_arrow(ax, xs, 7.1, xd, 6.38, color='#777766', lw=1.2)

# ─────────────────────────────────────────────
# INTERSTICES (labels agrandis + fond blanc)
# ─────────────────────────────────────────────
draw_interstice(ax, 4.62, 6.9, 0.98, 5.5,
                'Interstice 1\ncyber ≠ sûreté')
draw_interstice(ax, 9.70, 6.9, 1.00, 5.5,
                'Interstice 2\nsûreté ≠ sécurité physique')
draw_interstice(ax, 14.92, 6.9, 1.08, 5.5,
                'Interstice 3\nphysique ≠ renseignement')

# ─────────────────────────────────────────────
# CHRONOLOGIE SIMPLIFIÉE (6 jalons, ms=14)
# ─────────────────────────────────────────────
ax_tl = fig.add_axes([0.04, 0.03, 0.92, 0.11])
ax_tl.set_facecolor('#F0EDE5')
ax_tl.set_xlim(2008.5, 2026.8)
ax_tl.set_ylim(-0.1, 1.1)
ax_tl.axis('off')

ax_tl.axhline(0.5, color='#888877', lw=2.0, zorder=1)

# 6 jalons clés seulement
TL_EVENTS = [
    (2009, 'Création\nANSSI', '#1A237E', 'institution'),
    (2013, 'LPM\nart.22', '#1B5E20', 'doctrine'),
    (2016, 'CoSSeN\ncréé', '#4A148C', 'institution'),
    (2022, 'DOJ\nAkulov', '#B71C1C', 'opération'),
    (2023, 'DGI\nn°320', '#4A148C', 'doctrine'),
    (2025, 'ASNR /\nNIS2', '#1B5E20', 'institution'),
]
TYPE_COLORS_TL = {
    'institution': '#1A237E',
    'doctrine':    '#1B5E20',
    'opération':   '#B71C1C',
}

for i, (yr, lbl, clr, etype) in enumerate(TL_EVENTS):
    y_dot = 0.5
    y_txt = 0.82 if i % 2 == 0 else 0.15
    ax_tl.plot(yr, y_dot, 'o', color=clr, ms=14, zorder=5, mew=2.0, mec='white')
    ax_tl.plot([yr, yr], [y_dot, y_txt + (0.0 if i%2==0 else 0.02)],
               color=clr, lw=1.1, alpha=0.65, zorder=3)
    ax_tl.text(
        yr, y_txt, lbl,
        ha='center', va='bottom' if i % 2 == 0 else 'top',
        fontsize=8.5, fontfamily=FONT, fontweight='bold', color=clr,
        multialignment='center',
    )

for etype, clr in TYPE_COLORS_TL.items():
    ax_tl.scatter([], [], color=clr, s=80, label=etype.capitalize())

ax_tl.legend(
    title="Type", title_fontsize=7.5, fontsize=7.5,
    loc='lower right', bbox_to_anchor=(1.0, -0.05),
    framealpha=0.9, edgecolor='#CCCCBB', facecolor='#FDFAF4',
    prop={'family': FONT}, scatterpoints=1, ncol=3,
)

ax_tl.set_xticks(range(2009, 2027, 2))
ax_tl.set_xticklabels([str(y) for y in range(2009, 2027, 2)],
    fontsize=8, fontfamily=FONT)
ax_tl.xaxis.set_tick_params(which='both', bottom=True)
for sp in ax_tl.spines.values():
    sp.set_visible(False)

# ─────────────────────────────────────────────
# TITRE & NOTES
# ─────────────────────────────────────────────
fig.text(
    0.5, 0.978,
    'Architecture institutionnelle française de la sécurité cyber-nucléaire civile',
    ha='center', fontsize=16, fontfamily=FONT, fontweight='bold', color='#1A1A1A',
)
fig.text(
    0.5, 0.958,
    'Les quatre chaînes de commandement et leurs interstices (2009–2026)',
    ha='center', fontsize=11, fontfamily=FONT, style='italic', color='#444433',
)
fig.text(
    0.5, 0.133,
    'Zone hachurée ///  =  Interstice institutionnel : absence de coordination formalisée documentée',
    ha='center', fontsize=8.5, fontfamily=FONT, color=INTERSTICE_COLOR, style='italic',
)
fig.text(
    0.5, 0.004,
    'Sources : SGDSN — LPM 2013 loi n°2013-1168 art.22 — Décrets OIV 2015 — '
    'Loi n°2024-90 (ASNR, opérationnelle 2025) — DGI n°320 janv. 2023 (extraits) — '
    'Directive NIS2 2022/2555, transposition FR 2024-2025 — Décret CoSSeN 2016.',
    ha='center', fontsize=7.0, fontfamily=FONT, style='italic', color='#555544',
)

out_png = '/home/user/maison-m-dina/figures/figure3_architecture.png'
out_svg = '/home/user/maison-m-dina/figures/figure3_architecture.svg'
fig.savefig(out_png, dpi=300, bbox_inches='tight', facecolor=BG_COLOR)
fig.savefig(out_svg, format='svg', bbox_inches='tight', facecolor=BG_COLOR)
print("Figure 3 — OK")
plt.close()
