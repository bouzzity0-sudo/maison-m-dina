"""
Figure 3 — Architecture institutionnelle française — ITERATION 4

Corrections :
- 5e chaîne : COMCYBER / DGA-MI (cyberdéfense militaire)
- PSPG sublabel : Gendarmerie Nationale (clarification hiérarchique)
- DGA-MI ajouté dans chaîne COMCYBER
- PNC (Parquet National Cyber 2021) dans chaîne renseignement
- Connecteur LIO interministérielle (COMCYBER ↔ DGSE)
- 4 interstices (au lieu de 3)
- Timeline : COMCYBER 2017 + RSC 2018 ajoutés (8 jalons)
- ANSSI/OIV note clarifiée (obligation de qualification, pas prescriptions sûreté)
- HFDS annotation ajoutée
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
    'SGDSN':    '#1A237E',  # bleu institutionnel
    'ASNR':     '#1B5E20',  # vert sûreté nucléaire
    'CoSSeN':   '#4A148C',  # violet sécurité physique
    'COMCYBER': '#00695C',  # teal cyberdéfense militaire
    'Rens':     '#B71C1C',  # rouge renseignement
}
INTERSTICE_COLOR = '#C62828'
LIO_COLOR = '#BF360C'

fig = plt.figure(figsize=(26, 16))
fig.patch.set_facecolor(BG_COLOR)
ax = fig.add_axes([0.03, 0.14, 0.94, 0.78])
ax.set_facecolor(BG_COLOR)
ax.set_xlim(0, 24)
ax.set_ylim(0, 16)
ax.axis('off')

# ─────────────────────────────────────────────
# HELPERS
# ─────────────────────────────────────────────
def draw_box(ax, x, y, w, h, label, sublabel=None,
             facecolor='#1A237E', alpha=0.88, fontsize=8.5):
    box = FancyBboxPatch(
        (x, y), w, h,
        boxstyle='round,pad=0.08',
        facecolor=facecolor, edgecolor='white',
        linewidth=1.6, alpha=alpha, zorder=5,
    )
    ax.add_patch(box)
    cy = y + h / 2 + (0.10 if sublabel else 0)
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
            x + w / 2, y + h / 2 - 0.25, sublabel,
            ha='center', va='center',
            fontsize=fontsize - 1.8, fontfamily=FONT, style='italic',
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
        alpha=0.10,
        edgecolor=INTERSTICE_COLOR,
        linewidth=1.5,
        linestyle='--',
        hatch='///',
        zorder=4,
    )
    ax.add_patch(rect)
    ax.text(
        x + w / 2, y + h + 0.12,
        label,
        ha='center', va='bottom',
        fontsize=8.0, fontfamily=FONT, color=INTERSTICE_COLOR,
        fontweight='bold', style='italic', zorder=8,
        bbox=dict(
            boxstyle='round,pad=0.22',
            facecolor='white', alpha=0.87,
            edgecolor=INTERSTICE_COLOR, linewidth=0.8,
        ),
    )

# ─────────────────────────────────────────────
# POSITIONS DES 5 CHAÎNES
# ─────────────────────────────────────────────
W = 3.8   # largeur de chaque chaîne
C1X, C2X, C3X, C4X, C5X = 0.4, 5.1, 9.8, 14.5, 19.2
# Centres : 2.3, 7.0, 11.7, 16.4, 21.1

# ─────────────────────────────────────────────
# EN-TÊTE — PRÉSIDENT + CDSN
# ─────────────────────────────────────────────
draw_box(ax, 8.0, 14.9, 8.0, 0.85, 'PRÉSIDENT DE LA RÉPUBLIQUE',
         facecolor='#3E3E3A', alpha=0.92, fontsize=10.5)

draw_box(ax, 7.6, 13.8, 8.8, 0.80,
         'Conseil de Défense et de Sécurité Nationale (CDSN)',
         facecolor='#6D6D5A', alpha=0.75, fontsize=9.0)

draw_arrow(ax, 12.0, 14.9, 12.0, 14.6, color='#555544', lw=1.4)

# Barre horizontale de distribution
BAR_Y = 13.35
draw_arrow(ax, 12.0, 13.8, 12.0, 13.46, color='#666655', lw=1.4)
ax.plot([2.3, 21.1], [BAR_Y, BAR_Y], color='#666655', lw=1.2, zorder=4)
for xc in [2.3, 7.0, 11.7, 16.4, 21.1]:
    draw_arrow(ax, xc, BAR_Y, xc, 13.18, color='#666655', lw=1.2)

# ─────────────────────────────────────────────
# ANNOTATION NIVEAUX HIÉRARCHIQUES
# ─────────────────────────────────────────────
LEVEL_LABELS = [
    (12.7, 'Direction /\nMinistère'),
    (11.4, 'Agence /\nAutorité'),
    (10.1, 'Service\nopérationnel'),
    ( 8.3, 'Capacité\nactivée'),
]
for y_pos, lbl in LEVEL_LABELS:
    ax.text(0.05, y_pos, lbl, ha='left', va='center',
            fontsize=6.5, fontfamily=FONT, style='italic', color='#888877',
            bbox=dict(boxstyle='round,pad=0.18', facecolor='#F0EDE5',
                      alpha=0.7, edgecolor='#CCCCBB', linewidth=0.6))

# ─────────────────────────────────────────────
# CHAÎNE 1 — SGDSN / ANSSI
# ─────────────────────────────────────────────
draw_box(ax, C1X, 12.3, W, 0.85, 'SGDSN',
         sublabel='Secrétariat général défense\net sécurité nationale',
         facecolor=CHAIN_COLORS['SGDSN'], fontsize=8.5)
draw_arrow(ax, C1X+W/2, 12.3, C1X+W/2, 11.43, color=CHAIN_COLORS['SGDSN'])
draw_box(ax, C1X, 10.5, W, 0.85, 'ANSSI',
         sublabel='Agence nationale sécurité\ndes systèmes d\'information',
         facecolor=CHAIN_COLORS['SGDSN'], fontsize=8.5)
draw_arrow(ax, C1X+W/2, 10.5, C1X+W/2, 9.63, color=CHAIN_COLORS['SGDSN'])
draw_box(ax, C1X, 8.8, W, 0.80, 'CERT-FR',
         sublabel='Centre gouvernemental\nde veille et réponse',
         facecolor=CHAIN_COLORS['SGDSN'], alpha=0.75, fontsize=8.5)
draw_arrow(ax, C1X+W/2, 8.8, C1X+W/2, 7.93, color=CHAIN_COLORS['SGDSN'])
draw_box(ax, C1X, 7.1, W, 0.80, 'Qualification OIV',
         sublabel='LPM 2013 art.22 : obligation\nSSI secteurs nucléaire & énergie',
         facecolor=CHAIN_COLORS['SGDSN'], alpha=0.65, fontsize=8.0)

ax.text(C1X+W/2, 13.48, 'SGDSN / ANSSI', ha='center', fontsize=9.5,
        fontfamily=FONT, fontweight='bold', color=CHAIN_COLORS['SGDSN'])
ax.text(C1X+W/2, 13.22, 'Pilotage cyber & qualification OIV',
        ha='center', fontsize=7.2, fontfamily=FONT, style='italic', color='#444433')

# ─────────────────────────────────────────────
# CHAÎNE 2 — ASNR
# ─────────────────────────────────────────────
draw_box(ax, C2X, 12.3, W, 0.85, 'ASNR',
         sublabel='Autorité sûreté nucléaire\net radioprotection (2025)',
         facecolor=CHAIN_COLORS['ASNR'], fontsize=8.5)
draw_arrow(ax, C2X+W/2, 12.3, C2X+W/2, 11.43, color=CHAIN_COLORS['ASNR'])
draw_box(ax, C2X, 10.5, W, 0.85, 'ASN (ex)',
         sublabel='Autorité de sûreté\nnucléaire (—2024)',
         facecolor=CHAIN_COLORS['ASNR'], alpha=0.65, fontsize=8.5)
draw_arrow(ax, C2X+W/2, 10.5, C2X+W/2, 9.63, color=CHAIN_COLORS['ASNR'])
draw_box(ax, C2X, 8.8, W, 0.80, 'IRSN (ex)',
         sublabel='Institut radioprotection\net sûreté nucl. (—2024)',
         facecolor=CHAIN_COLORS['ASNR'], alpha=0.65, fontsize=8.5)
draw_arrow(ax, C2X+W/2, 8.8, C2X+W/2, 7.93, color=CHAIN_COLORS['ASNR'])
draw_box(ax, C2X, 7.1, W, 0.80, 'Prescriptions\ncyber-sûreté',
         sublabel='Guides techniques ASNR\n(non contraignants pré-2025)',
         facecolor=CHAIN_COLORS['ASNR'], alpha=0.60, fontsize=8.0)

ax.text(C2X+W/2, 13.48, 'ASNR', ha='center', fontsize=9.5,
        fontfamily=FONT, fontweight='bold', color=CHAIN_COLORS['ASNR'])
ax.text(C2X+W/2, 13.22, 'Sûreté nucléaire & radioprotection',
        ha='center', fontsize=7.2, fontfamily=FONT, style='italic', color='#444433')

# ─────────────────────────────────────────────
# CHAÎNE 3 — CoSSeN / PSPG
# ─────────────────────────────────────────────
draw_box(ax, C3X, 12.3, W, 0.85, 'CoSSeN',
         sublabel='Comité stratégique sécurité\nnucléaire (2016)',
         facecolor=CHAIN_COLORS['CoSSeN'], fontsize=8.5)
draw_arrow(ax, C3X+W/2, 12.3, C3X+W/2, 11.43, color=CHAIN_COLORS['CoSSeN'])
draw_box(ax, C3X, 10.5, W, 0.85, 'PSPG',
         sublabel='Peloton spécialisé protection\n(Gendarmerie Nationale — 21 pel.)',
         facecolor=CHAIN_COLORS['CoSSeN'], fontsize=8.5)
draw_arrow(ax, C3X+W/2, 10.5, C3X+W/2, 9.63, color=CHAIN_COLORS['CoSSeN'])
draw_box(ax, C3X, 8.8, W, 0.80, 'DGI n°320',
         sublabel='Directive gouvernementale\njanvier 2023',
         facecolor=CHAIN_COLORS['CoSSeN'], alpha=0.75, fontsize=8.5)
draw_arrow(ax, C3X+W/2, 8.8, C3X+W/2, 7.93, color=CHAIN_COLORS['CoSSeN'])
draw_box(ax, C3X, 7.1, W, 0.80, 'Sécurité physique\nsites nucléaires',
         sublabel='Zones protégées / vitales\n(Code défense L. 1333)',
         facecolor=CHAIN_COLORS['CoSSeN'], alpha=0.65, fontsize=8.0)

ax.text(C3X+W/2, 13.48, 'CoSSeN / PSPG', ha='center', fontsize=9.5,
        fontfamily=FONT, fontweight='bold', color=CHAIN_COLORS['CoSSeN'])
ax.text(C3X+W/2, 13.22, 'Sécurité physique & doctrine',
        ha='center', fontsize=7.2, fontfamily=FONT, style='italic', color='#444433')

# ─────────────────────────────────────────────
# CHAÎNE 4 — COMCYBER / DGA-MI  (NOUVELLE)
# ─────────────────────────────────────────────
draw_box(ax, C4X, 12.3, W, 0.85, 'COMCYBER',
         sublabel='Commandement de la cyberdéfense\n(EMA — sept. 2016)',
         facecolor=CHAIN_COLORS['COMCYBER'], fontsize=8.5)
draw_arrow(ax, C4X+W/2, 12.3, C4X+W/2, 11.43, color=CHAIN_COLORS['COMCYBER'])
draw_box(ax, C4X, 10.5, W, 0.85, 'CALID',
         sublabel='Centre d\'analyse en lutte\ninformatique défensive',
         facecolor=CHAIN_COLORS['COMCYBER'], fontsize=8.5)
draw_arrow(ax, C4X+W/2, 10.5, C4X+W/2, 9.63, color=CHAIN_COLORS['COMCYBER'])
draw_box(ax, C4X, 8.8, W, 0.80, 'DGA-MI',
         sublabel='Direction armement /\nMaîtrise info. (Rennes)',
         facecolor=CHAIN_COLORS['COMCYBER'], alpha=0.75, fontsize=8.5)
draw_arrow(ax, C4X+W/2, 8.8, C4X+W/2, 7.93, color=CHAIN_COLORS['COMCYBER'])
draw_box(ax, C4X, 7.1, W, 0.80, 'LID / LIO\nmilitaire',
         sublabel='Capacité offensive militaire\n(classifié — Revue Strat. Cyber 2018)',
         facecolor=CHAIN_COLORS['COMCYBER'], alpha=0.65, fontsize=8.0)

ax.text(C4X+W/2, 13.48, 'COMCYBER / DGA-MI', ha='center', fontsize=9.5,
        fontfamily=FONT, fontweight='bold', color=CHAIN_COLORS['COMCYBER'])
ax.text(C4X+W/2, 13.22, 'Cyberdéfense militaire',
        ha='center', fontsize=7.2, fontfamily=FONT, style='italic', color='#444433')

# ─────────────────────────────────────────────
# CHAÎNE 5 — DGSI / DGSE / Renseignement
# ─────────────────────────────────────────────
draw_box(ax, C5X, 12.3, W, 0.85, 'DGSI',
         sublabel='Direction générale\nsécurité intérieure',
         facecolor=CHAIN_COLORS['Rens'], fontsize=8.5)
draw_arrow(ax, C5X+W/2, 12.3, C5X+W/2, 11.43, color=CHAIN_COLORS['Rens'])
draw_box(ax, C5X, 10.5, W, 0.85, 'DGSE',
         sublabel='Direction générale\nsécurité extérieure',
         facecolor=CHAIN_COLORS['Rens'], fontsize=8.5)
draw_arrow(ax, C5X+W/2, 10.5, C5X+W/2, 9.63, color=CHAIN_COLORS['Rens'])
draw_box(ax, C5X, 8.8, W, 0.80, 'LIO externe',
         sublabel='Action informatique offensive\n(interministérielle, classifié)',
         facecolor=CHAIN_COLORS['Rens'], alpha=0.75, fontsize=8.5)
draw_arrow(ax, C5X+W/2, 8.8, C5X+W/2, 7.93, color=CHAIN_COLORS['Rens'])
draw_box(ax, C5X, 7.1, W, 0.80, 'PNC / Attribution',
         sublabel='Parquet National Cyber (2021)\nAttribution stratégique (SGDSN)',
         facecolor=CHAIN_COLORS['Rens'], alpha=0.65, fontsize=8.0)

ax.text(C5X+W/2, 13.48, 'DGSI / DGSE / LIO', ha='center', fontsize=9.5,
        fontfamily=FONT, fontweight='bold', color=CHAIN_COLORS['Rens'])
ax.text(C5X+W/2, 13.22, 'Renseignement & contre-ingérence',
        ha='center', fontsize=7.2, fontfamily=FONT, style='italic', color='#444433')

# ─────────────────────────────────────────────
# CONNECTEUR LIO INTERMINISTÉRIELLE (entre C4 et C5)
# ─────────────────────────────────────────────
# Double-headed arrow at row-3 level (Y ≈ 9.2)
LIO_Y = 9.18
ax.annotate(
    '', xy=(C5X, LIO_Y), xytext=(C4X + W, LIO_Y),
    arrowprops=dict(arrowstyle='<->', color=LIO_COLOR, lw=1.6,
                    linestyle='dashed', mutation_scale=14),
    zorder=12,
)
ax.text(
    (C4X + W + C5X) / 2, LIO_Y + 0.52,
    'LIO\ninterministérielle',
    ha='center', va='bottom', fontsize=6.5, fontfamily=FONT,
    color=LIO_COLOR, fontweight='bold', style='italic', zorder=13,
    bbox=dict(boxstyle='round,pad=0.20', facecolor='#FBE9E7',
              alpha=0.88, edgecolor=LIO_COLOR, linewidth=0.7),
)

# ─────────────────────────────────────────────
# OPÉRATEURS (bande couvrant les 5 chaînes)
# ─────────────────────────────────────────────
OP_X = C1X + 0.1
OP_W = (C5X + W - 0.1) - OP_X
draw_box(ax, OP_X, 5.5, OP_W, 0.88,
         'EDF / Framatome / Orano — CYCLIFE / CEA',
         sublabel='Opérateurs nucléaires civils — OIV soumis LPM art.22 et prescriptions ASNR',
         facecolor='#546E7A', fontsize=9.5)

for xc in [2.3, 7.0, 11.7, 16.4, 21.1]:
    draw_arrow(ax, xc, 7.1, xc, 6.38, color='#777766', lw=1.2)

# ─────────────────────────────────────────────
# 4 INTERSTICES
# ─────────────────────────────────────────────
INT_Y  = 6.9
INT_H  = 5.55  # de y=6.9 à y=12.45

# Centres des gaps : 4.2/5.1 → 4.25; 8.9/9.8 → 8.95; 13.6/14.5 → 13.65; 18.3/19.2 → 18.35
draw_interstice(ax, 4.25, INT_Y, 0.80, INT_H,
                'Interstice 1\ncyber ≠ sûreté')
draw_interstice(ax, 8.95, INT_Y, 0.80, INT_H,
                'Interstice 2\nsûreté ≠ sécurité physique')
draw_interstice(ax, 13.65, INT_Y, 0.80, INT_H,
                'Interstice 3\nphysique ≠ cyberdéfense')
draw_interstice(ax, 18.35, INT_Y, 0.80, INT_H,
                'Interstice 4\ncyberdéfense ≠ renseignement')

# ─────────────────────────────────────────────
# ANNOTATION HFDS
# ─────────────────────────────────────────────
ax.text(
    23.55, 11.2,
    'HFDS\n(Hauts fonctionnaires\ndéfense & sécurité)\n→ officiers de liaison\ndans chaque ministère',
    ha='center', va='center', fontsize=6.5, fontfamily=FONT,
    style='italic', color='#555544', zorder=8,
    bbox=dict(boxstyle='round,pad=0.3', facecolor='#F0EDE5',
              alpha=0.85, edgecolor='#CCCCBB', linewidth=0.7),
)

# ─────────────────────────────────────────────
# CHRONOLOGIE SIMPLIFIÉE (8 jalons)
# ─────────────────────────────────────────────
ax_tl = fig.add_axes([0.03, 0.03, 0.94, 0.10])
ax_tl.set_facecolor('#F0EDE5')
ax_tl.set_xlim(2008.5, 2026.8)
ax_tl.set_ylim(-0.1, 1.1)
ax_tl.axis('off')

ax_tl.axhline(0.5, color='#888877', lw=2.0, zorder=1)

TL_EVENTS = [
    (2009, 'Création\nANSSI',   '#1A237E'),
    (2013, 'LPM\nart.22',       '#1B5E20'),
    (2016, 'CoSSeN\ncréé',      '#4A148C'),
    (2017, 'COMCYBER\ncréé',    '#00695C'),
    (2018, 'RSC\n(cyber)',       '#1B5E20'),
    (2022, 'DOJ\nAkulov',       '#B71C1C'),
    (2023, 'DGI\nn°320',        '#4A148C'),
    (2025, 'ASNR /\nNIS2',      '#1B5E20'),
]

for i, (yr, lbl, clr) in enumerate(TL_EVENTS):
    y_dot = 0.5
    above = (i % 2 == 0)
    y_txt = 0.84 if above else 0.12
    ax_tl.plot(yr, y_dot, 'o', color=clr, ms=13, zorder=5, mew=1.8, mec='white')
    ax_tl.plot([yr, yr], [y_dot, y_txt + (0.0 if above else 0.02)],
               color=clr, lw=1.0, alpha=0.6, zorder=3)
    ax_tl.text(
        yr, y_txt, lbl,
        ha='center', va='bottom' if above else 'top',
        fontsize=8.0, fontfamily=FONT, fontweight='bold', color=clr,
        multialignment='center',
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
    'Les cinq chaînes de commandement, leurs interstices et la connexion LIO interministérielle (2009–2026)',
    ha='center', fontsize=11, fontfamily=FONT, style='italic', color='#444433',
)
fig.text(
    0.5, 0.13,
    'Zone hachurée ///  =  Interstice institutionnel : absence de coordination formalisée documentée',
    ha='center', fontsize=8.5, fontfamily=FONT, color=INTERSTICE_COLOR, style='italic',
)
fig.text(
    0.5, 0.004,
    'Sources : SGDSN — LPM 2013 loi n°2013-1168 art.22 — Décret CoSSeN n°2016-570 — '
    'Arrêté COMCYBER sept. 2016 — Revue Stratégique Cyber FR 2018 — '
    'Loi n°2024-90 (ASNR, opérationnelle 2025) — DGI n°320 janv. 2023 (extraits) — '
    'Décret PNC 2021 — Directive NIS2 2022/2555, transposition FR 2024-2025.',
    ha='center', fontsize=7.0, fontfamily=FONT, style='italic', color='#555544',
)

out_png = '/home/user/maison-m-dina/figures/figure3_architecture.png'
out_svg = '/home/user/maison-m-dina/figures/figure3_architecture.svg'
fig.savefig(out_png, dpi=300, bbox_inches='tight', facecolor=BG_COLOR)
fig.savefig(out_svg, format='svg', bbox_inches='tight', facecolor=BG_COLOR)
print("Figure 3 — OK (itération 4)")
plt.close()
