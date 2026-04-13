"""
Figure 3 — Architecture institutionnelle française cyber-nucléaire
4 chaînes : SGDSN/ANSSI | ASNR | CoSSeN/PSPG | DGSI/DGSE
3 interstices surlignés en rouge hachuré
Chronologie 2009→2026 en bas
"""
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch
import matplotlib.patheffects as pe

BG_COLOR = '#F9F6EF'

# ─────────────────────────────────────────────
# COULEURS PAR CHAÎNE
# ─────────────────────────────────────────────
CHAIN_COLORS = {
    'SGDSN':  '#1A237E',   # bleu marine
    'ASNR':   '#1B5E20',   # vert
    'CoSSeN': '#4A148C',   # violet
    'Rens':   '#B71C1C',   # rouge (DGSI/DGSE)
}
INTERSTICE_COLOR = '#C62828'
INTERSTICE_ALPHA = 0.13

fig = plt.figure(figsize=(22, 16))
fig.patch.set_facecolor(BG_COLOR)
ax = fig.add_axes([0.04, 0.14, 0.92, 0.80])
ax.set_facecolor(BG_COLOR)
ax.set_xlim(0, 22)
ax.set_ylim(0, 16)
ax.axis('off')

# ─────────────────────────────────────────────
# HELPER : Boîte institutionnelle
# ─────────────────────────────────────────────
def draw_box(ax, x, y, w, h, label, sublabel=None,
             facecolor='#1A237E', alpha=0.88, fontsize=9, chain=None):
    """Dessine une boîte avec label centré."""
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
        fontsize=fontsize, fontfamily='P052', fontweight='bold',
        color='white', zorder=6,
        multialignment='center',
        path_effects=[pe.withStroke(linewidth=1.5, foreground='#00000055')],
    )
    if sublabel:
        ax.text(
            x + w / 2, y + h / 2 - 0.28, sublabel,
            ha='center', va='center',
            fontsize=fontsize - 1.5, fontfamily='P052', style='italic',
            color='#FFFFFFBB', zorder=6,
            multialignment='center',
        )

def draw_arrow(ax, x1, y1, x2, y2, color='#555544', lw=1.4, style='->', rad=0.0):
    ax.annotate(
        '', xy=(x2, y2), xytext=(x1, y1),
        arrowprops=dict(
            arrowstyle=style, color=color, lw=lw,
            connectionstyle=f'arc3,rad={rad}',
        ),
        zorder=7,
    )

def draw_interstice(ax, x, y, w, h, label):
    """Zone interstice = rectangle hachuré rouge."""
    rect = mpatches.Rectangle(
        (x, y), w, h,
        facecolor=INTERSTICE_COLOR,
        alpha=INTERSTICE_ALPHA,
        edgecolor=INTERSTICE_COLOR,
        linewidth=1.5,
        linestyle='--',
        hatch='///',
        zorder=4,
    )
    ax.add_patch(rect)
    ax.text(
        x + w / 2, y + h + 0.15,
        label,
        ha='center', va='bottom',
        fontsize=7.5, fontfamily='P052', color=INTERSTICE_COLOR,
        fontweight='bold', style='italic', zorder=8,
    )

# ─────────────────────────────────────────────
# EN-TÊTE : Organes politiques
# ─────────────────────────────────────────────
ax.text(
    11, 15.6, 'PRÉSIDENT DE LA RÉPUBLIQUE',
    ha='center', va='center',
    fontsize=11, fontfamily='P052', fontweight='bold', color='#1A1A1A',
    bbox=dict(boxstyle='round,pad=0.4', facecolor='#E8E4DA', edgecolor='#AAAAAA', linewidth=1.5),
    zorder=6,
)
ax.text(
    11, 14.8, 'Conseil de Défense et de Sécurité Nationale (CDSN)',
    ha='center', va='center',
    fontsize=9.5, fontfamily='P052', style='italic', color='#333322',
    bbox=dict(boxstyle='round,pad=0.3', facecolor='#F0EDE5', edgecolor='#CCCCBB', linewidth=1.0),
    zorder=6,
)

# Flèches vers les 4 chaînes
for xpos in [2.5, 7.5, 13.0, 18.5]:
    draw_arrow(ax, 11, 14.5, xpos, 13.5, color='#666655', lw=1.2, rad=0.0)

# ─────────────────────────────────────────────
# CHAÎNE 1 — SGDSN / ANSSI
# ─────────────────────────────────────────────
C1X = 0.4
draw_box(ax, C1X, 12.8, 4.2, 0.9, 'SGDSN',
         sublabel='Secrétariat général défense\net sécurité nationale',
         facecolor=CHAIN_COLORS['SGDSN'], fontsize=8.5)
draw_arrow(ax, C1X+2.1, 12.8, C1X+2.1, 11.9, color=CHAIN_COLORS['SGDSN'])
draw_box(ax, C1X, 11.0, 4.2, 0.9, 'ANSSI',
         sublabel='Agence nationale sécurité\ndes systèmes d\'information',
         facecolor=CHAIN_COLORS['SGDSN'], fontsize=8.5)
draw_arrow(ax, C1X+2.1, 11.0, C1X+2.1, 10.1, color=CHAIN_COLORS['SGDSN'])
draw_box(ax, C1X, 9.2, 4.2, 0.9, 'CERT-FR',
         sublabel='Centre gouvernemental\nde veille et réponse',
         facecolor=CHAIN_COLORS['SGDSN'], alpha=0.75, fontsize=8.5)
draw_arrow(ax, C1X+2.1, 9.2, C1X+2.1, 8.3, color=CHAIN_COLORS['SGDSN'])
draw_box(ax, C1X, 7.4, 4.2, 0.9, 'OIV Nucléaires',
         sublabel='Qualification LPM 2013 art.22\nObligations SSI sectorielles',
         facecolor=CHAIN_COLORS['SGDSN'], alpha=0.65, fontsize=8.0)

ax.text(C1X+2.1, 13.9, 'SGDSN / ANSSI',
        ha='center', fontsize=10, fontfamily='P052', fontweight='bold',
        color=CHAIN_COLORS['SGDSN'])
ax.text(C1X+2.1, 13.55, 'Pilotage cyber & qualification OIV',
        ha='center', fontsize=8, fontfamily='P052', style='italic', color='#444433')

# ─────────────────────────────────────────────
# CHAÎNE 2 — ASNR (ex-ASN+IRSN)
# ─────────────────────────────────────────────
C2X = 5.6
draw_box(ax, C2X, 12.8, 4.0, 0.9, 'ASNR',
         sublabel='Autorité sûreté nucléaire\net radioprotection (2025)',
         facecolor=CHAIN_COLORS['ASNR'], fontsize=8.5)
draw_arrow(ax, C2X+2.0, 12.8, C2X+2.0, 11.9, color=CHAIN_COLORS['ASNR'])
draw_box(ax, C2X, 11.0, 4.0, 0.9, 'ASN (ex)',
         sublabel='Autorité de sûreté\nnucléaire (—2024)',
         facecolor=CHAIN_COLORS['ASNR'], alpha=0.65, fontsize=8.5)
draw_arrow(ax, C2X+2.0, 11.0, C2X+2.0, 10.1, color=CHAIN_COLORS['ASNR'])
draw_box(ax, C2X, 9.2, 4.0, 0.9, 'IRSN (ex)',
         sublabel='Institut radioprotection\net sûreté nucléaire (—2024)',
         facecolor=CHAIN_COLORS['ASNR'], alpha=0.65, fontsize=8.5)
draw_arrow(ax, C2X+2.0, 9.2, C2X+2.0, 8.3, color=CHAIN_COLORS['ASNR'])
draw_box(ax, C2X, 7.4, 4.0, 0.9, 'Prescriptions\ncyber sûreté',
         sublabel='Guides techniques\n(non contraignants pré-2025)',
         facecolor=CHAIN_COLORS['ASNR'], alpha=0.60, fontsize=8.0)

ax.text(C2X+2.0, 13.9, 'ASNR',
        ha='center', fontsize=10, fontfamily='P052', fontweight='bold',
        color=CHAIN_COLORS['ASNR'])
ax.text(C2X+2.0, 13.55, 'Sûreté nucléaire & radioprotection',
        ha='center', fontsize=8, fontfamily='P052', style='italic', color='#444433')

# ─────────────────────────────────────────────
# CHAÎNE 3 — CoSSeN / PSPG
# ─────────────────────────────────────────────
C3X = 10.7
draw_box(ax, C3X, 12.8, 4.2, 0.9, 'CoSSeN',
         sublabel='Comité stratégique sécurité\nnucléaire (2016)',
         facecolor=CHAIN_COLORS['CoSSeN'], fontsize=8.5)
draw_arrow(ax, C3X+2.1, 12.8, C3X+2.1, 11.9, color=CHAIN_COLORS['CoSSeN'])
draw_box(ax, C3X, 11.0, 4.2, 0.9, 'PSPG',
         sublabel='Peloton spécialisé protection\ngendarmerie (EDF / sites)',
         facecolor=CHAIN_COLORS['CoSSeN'], fontsize=8.5)
draw_arrow(ax, C3X+2.1, 11.0, C3X+2.1, 10.1, color=CHAIN_COLORS['CoSSeN'])
draw_box(ax, C3X, 9.2, 4.2, 0.9, 'DGI n°320',
         sublabel='Directive gouvernementale\njanvier 2023',
         facecolor=CHAIN_COLORS['CoSSeN'], alpha=0.75, fontsize=8.5)
draw_arrow(ax, C3X+2.1, 9.2, C3X+2.1, 8.3, color=CHAIN_COLORS['CoSSeN'])
draw_box(ax, C3X, 7.4, 4.2, 0.9, 'Sécurité physique\nsites nucléaires',
         sublabel='Zones protégées / vitales\n(Code défense)',
         facecolor=CHAIN_COLORS['CoSSeN'], alpha=0.65, fontsize=8.0)

ax.text(C3X+2.1, 13.9, 'CoSSeN / PSPG',
        ha='center', fontsize=10, fontfamily='P052', fontweight='bold',
        color=CHAIN_COLORS['CoSSeN'])
ax.text(C3X+2.1, 13.55, 'Sécurité physique & doctrine',
        ha='center', fontsize=8, fontfamily='P052', style='italic', color='#444433')

# ─────────────────────────────────────────────
# CHAÎNE 4 — DGSI / DGSE / Renseignement
# ─────────────────────────────────────────────
C4X = 16.0
draw_box(ax, C4X, 12.8, 4.2, 0.9, 'DGSI',
         sublabel='Direction générale\nsécurité intérieure',
         facecolor=CHAIN_COLORS['Rens'], fontsize=8.5)
draw_arrow(ax, C4X+2.1, 12.8, C4X+2.1, 11.9, color=CHAIN_COLORS['Rens'])
draw_box(ax, C4X, 11.0, 4.2, 0.9, 'DGSE',
         sublabel='Direction générale\nsécurité extérieure',
         facecolor=CHAIN_COLORS['Rens'], fontsize=8.5)
draw_arrow(ax, C4X+2.1, 11.0, C4X+2.1, 10.1, color=CHAIN_COLORS['Rens'])
draw_box(ax, C4X, 9.2, 4.2, 0.9, 'LIO',
         sublabel='Lutte informatique\noffensive (classifié)',
         facecolor=CHAIN_COLORS['Rens'], alpha=0.75, fontsize=8.5)
draw_arrow(ax, C4X+2.1, 9.2, C4X+2.1, 8.3, color=CHAIN_COLORS['Rens'])
draw_box(ax, C4X, 7.4, 4.2, 0.9, 'Attribution\nstratégique',
         sublabel='Processus interministériel\n(SGDSN coordination)',
         facecolor=CHAIN_COLORS['Rens'], alpha=0.65, fontsize=8.0)

ax.text(C4X+2.1, 13.9, 'DGSI / DGSE / LIO',
        ha='center', fontsize=10, fontfamily='P052', fontweight='bold',
        color=CHAIN_COLORS['Rens'])
ax.text(C4X+2.1, 13.55, 'Renseignement & contre-ingérence',
        ha='center', fontsize=8, fontfamily='P052', style='italic', color='#444433')

# ─────────────────────────────────────────────
# OPÉRATEURS (bas des chaînes)
# ─────────────────────────────────────────────
draw_box(ax, 3.5, 5.8, 14.5, 0.9,
         'EDF / Framatome / Orano — CYCLIFE / CEA',
         sublabel='Opérateurs nucléaires civils — OIV soumis LPM art.22 et prescriptions ASNR',
         facecolor='#37474F', fontsize=9.5)

# Flèches vers opérateurs
for xpos_src, xpos_dst in [
    (C1X+2.1, 5.5), (C2X+2.0, 8.5),
    (C3X+2.1, 11.5), (C4X+2.1, 15.5)
]:
    draw_arrow(ax, xpos_src, 7.4, xpos_dst, 6.7, color='#777766', lw=1.2)

# ─────────────────────────────────────────────
# INTERSTICES (3 zones de rupture institutionnelle)
# ─────────────────────────────────────────────
# Interstice 1 : entre ANSSI (cyber) et ASNR (sûreté)
draw_interstice(
    ax, 4.62, 7.2, 0.98, 5.7,
    'Interstice 1\ncyber ≠ sûreté',
)
# Interstice 2 : entre ASNR (sûreté) et CoSSeN (physique)
draw_interstice(
    ax, 9.70, 7.2, 1.00, 5.7,
    'Interstice 2\nsûreté ≠ sécurité physique',
)
# Interstice 3 : entre CoSSeN (physique) et DGSI/DGSE (rens.)
draw_interstice(
    ax, 14.92, 7.2, 1.08, 5.7,
    'Interstice 3\nsécurité physique ≠ rens.',
)

# ─────────────────────────────────────────────
# CHRONOLOGIE 2009→2026 (bande basse)
# ─────────────────────────────────────────────
ax_tl = fig.add_axes([0.04, 0.03, 0.92, 0.10])
ax_tl.set_facecolor('#F0EDE5')
ax_tl.set_xlim(2008.5, 2026.8)
ax_tl.set_ylim(-0.1, 1.1)
ax_tl.axis('off')

# Ligne principale
ax_tl.axhline(0.5, color='#888877', lw=2.0, zorder=1)

EVENTS = [
    (2009, 'ANSSI\ncréée', '#1A237E', 'institution'),
    (2013, 'LPM art.22\nOIV', '#1A237E', 'doctrine'),
    (2015, 'Décrets\nOIV', '#1B5E20', 'doctrine'),
    (2016, 'CoSSeN\ncréé', '#4A148C', 'institution'),
    (2017, 'TRITON\n(TEMP.Veles)', '#C62828', 'opération'),
    (2022, 'DOJ Akulov\n(HAVEX)', '#C62828', 'opération'),
    (2023.1, 'DGI n°320\n(janv.)', '#4A148C', 'doctrine'),
    (2025.0, 'ASNR\ncréée', '#1B5E20', 'institution'),
    (2025.5, 'NIS2\ntransposition', '#1A237E', 'doctrine'),
]

TYPE_COLORS = {
    'institution': '#1A237E',
    'doctrine':    '#1B5E20',
    'opération':   '#C62828',
}

for i, (yr, lbl, clr, etype) in enumerate(EVENTS):
    y_dot = 0.5
    y_txt = 0.78 if i % 2 == 0 else 0.18
    ax_tl.plot(yr, y_dot, 'o', color=clr, ms=9, zorder=5)
    ax_tl.plot([yr, yr], [y_dot, y_txt], color=clr, lw=0.9, alpha=0.6, zorder=3)
    ax_tl.text(
        yr, y_txt + (0.05 if i % 2 == 0 else -0.05),
        lbl,
        ha='center', va='bottom' if i % 2 == 0 else 'top',
        fontsize=6.8, fontfamily='P052', fontweight='bold', color=clr,
        multialignment='center',
    )

# Légende chronologie
for etype, clr in TYPE_COLORS.items():
    ax_tl.scatter([], [], color=clr, s=60, label=etype.capitalize())

ax_tl.legend(
    title='Type d\'événement',
    title_fontsize=7, fontsize=7,
    loc='lower right', bbox_to_anchor=(1.0, -0.1),
    framealpha=0.9, edgecolor='#CCCCBB', facecolor='#FDFAF4',
    prop={'family': 'P052'},
    scatterpoints=1, ncol=3,
)

ax_tl.set_xticks([y for y in range(2009, 2027, 2)])
ax_tl.set_xticklabels(
    [str(y) for y in range(2009, 2027, 2)],
    fontsize=7.5, fontfamily='P052',
)
ax_tl.xaxis.set_tick_params(which='both', bottom=True)
for sp in ax_tl.spines.values():
    sp.set_visible(False)

# ─────────────────────────────────────────────
# TITRE PRINCIPAL
# ─────────────────────────────────────────────
fig.text(
    0.5, 0.975,
    'Architecture institutionnelle française de la sécurité cyber-nucléaire civile',
    ha='center', fontsize=16, fontfamily='P052', fontweight='bold', color='#1A1A1A',
)
fig.text(
    0.5, 0.954,
    'Les quatre chaînes de commandement et leurs interstices (2009–2026)',
    ha='center', fontsize=11, fontfamily='P052', style='italic', color='#444433',
)

# Légende interstice
fig.text(
    0.5, 0.13,
    'Zone hachurée rouge \\\\\\  =  Interstice institutionnel : absence de coordination formalisée documentée',
    ha='center', fontsize=8.5, fontfamily='P052', color=INTERSTICE_COLOR, style='italic',
)

note = (
    'Sources : SGDSN — LPM 2013 loi n°2013-1168 art.22 — Décrets OIV 2015 — '
    'Loi n°2024-90 créant l\'ASNR (mars 2024, opérationnelle 2025) — '
    'DGI n°320 janv. 2023 (classifiée, extraits publics) — Directive NIS2 (UE) 2022/2555, '
    'transposition FR 2024-2025 — CoSSeN décret 2016.'
)
fig.text(
    0.5, 0.005,
    note,
    ha='center', fontsize=7.0, fontfamily='P052',
    style='italic', color='#555544',
)

out_png = '/home/user/maison-m-dina/figures/figure3_architecture.png'
out_svg = '/home/user/maison-m-dina/figures/figure3_architecture.svg'
fig.savefig(out_png, dpi=300, bbox_inches='tight', facecolor=BG_COLOR)
fig.savefig(out_svg, format='svg', bbox_inches='tight', facecolor=BG_COLOR)
print(f"Figure 3 exportée : {out_png}  |  {out_svg}")
plt.close()
