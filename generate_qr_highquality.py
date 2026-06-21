"""
AI Handle — High-Quality Branded QR Code Generator
Generates premium QR codes with the AI Handle logo centered, rounded modules,
proper error correction, and clean visual design for both digital and print use.
"""
import qrcode
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers import RoundedModuleDrawer
from qrcode.image.styles.colormasks import SolidFillColorMask
from PIL import Image, ImageDraw, ImageFont
import os
import math

# ─── Configuration ───
LOGO_PATH = 'public/brand/ai-handle-logo.png'
OUTPUT_DIR = 'public/brand'
DESKTOP_DIR = '../'

# QR code destinations
QRCODES = [
    {
        'name': 'Omar Mohamed',
        'url': 'https://aihandle.cloud/omar.html',
        'output_file': 'qr-omar-profile.png',
        'desktop_file': 'Omar_Mohamed_QR.png',
    },
    {
        'name': 'Mohamed Rayan',
        'url': 'https://aihandle.cloud/rayan.html',
        'output_file': 'qr-rayan-profile.png',
        'desktop_file': 'Mohamed_Rayan_QR.png',
    },
]

# Colors
DARK_COLOR = (10, 10, 10)        # #0A0A0A — obsidian
LIGHT_COLOR = (255, 255, 255)    # white background
LOGO_BG_COLOR = (255, 255, 255)  # white circle behind logo
ACCENT_COLOR = (201, 169, 110)   # #C9A96E — champagne gold


def create_circular_logo(logo_path, target_size):
    """Create a circular logo with transparent background."""
    logo = Image.open(logo_path).convert('RGBA')
    
    # Resize logo to fit within the target size
    logo.thumbnail((target_size, target_size), Image.LANCZOS)
    
    # Create circular mask
    mask = Image.new('L', logo.size, 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.ellipse((0, 0, logo.size[0] - 1, logo.size[1] - 1), fill=255)
    
    # Apply mask
    result = Image.new('RGBA', logo.size, (255, 255, 255, 0))
    result.paste(logo, mask=mask)
    
    return result


def generate_high_quality_qr(data, output_path, logo_path):
    """Generate a high-quality QR code with embedded logo."""
    
    # Create QR code with high error correction for logo overlay
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,  # 30% error correction
        box_size=20,  # Higher resolution
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)
    
    # Generate QR image with styled modules
    qr_img = qr.make_image(
        image_factory=StyledPilImage,
        module_drawer=RoundedModuleDrawer(),
        color_mask=SolidFillColorMask(
            back_color=LIGHT_COLOR,
            front_color=DARK_COLOR
        ),
    ).convert('RGBA')
    
    qr_w, qr_h = qr_img.size
    
    # Calculate logo size (about 22% of QR code size for good scanability)
    logo_size = int(min(qr_w, qr_h) * 0.22)
    
    # Create circular logo
    circular_logo = create_circular_logo(logo_path, logo_size)
    
    # Create white circle background for logo
    bg_padding = 12
    bg_size = logo_size + bg_padding * 2
    bg = Image.new('RGBA', (bg_size, bg_size), (255, 255, 255, 255))
    
    # Add subtle border to background circle
    bg_draw = ImageDraw.Draw(bg)
    bg_draw.ellipse(
        [1, 1, bg_size - 2, bg_size - 2],
        fill=LOGO_BG_COLOR,
        outline=(230, 230, 230, 255),
        width=1
    )
    
    # Paste logo onto background
    logo_pos = ((bg_size - logo_size) // 2, (bg_size - logo_size) // 2)
    bg.paste(circular_logo, logo_pos, circular_logo)
    
    # Calculate position to center logo
    pos_x = (qr_w - bg_size) // 2
    pos_y = (qr_h - bg_size) // 2
    
    # Paste logo onto QR code
    qr_img.paste(bg, (pos_x, pos_y), bg)
    
    # Add subtle gold accent ring around logo
    ring_draw = ImageDraw.Draw(qr_img)
    ring_radius = bg_size // 2 + 4
    center_x, center_y = qr_w // 2, qr_h // 2
    
    # Draw thin gold ring
    for width_offset in range(2):
        r = ring_radius + width_offset
        ring_draw.ellipse(
            [center_x - r, center_y - r, center_x + r, center_y + r],
            outline=(*ACCENT_COLOR, 60),
            width=1
        )
    
    # Save as high-quality PNG
    qr_img = qr_img.convert('RGB')
    qr_img.save(output_path, 'PNG', dpi=(300, 300))
    
    return qr_img


def main():
    """Generate all QR codes."""
    # Ensure output directory exists
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    # Check logo exists
    if not os.path.exists(LOGO_PATH):
        print(f'ERROR: Logo not found at {LOGO_PATH}')
        return
    
    print(f'Logo found: {LOGO_PATH}')
    print(f'Generating high-quality QR codes...\n')
    
    for qr_data in QRCODES:
        output_path = os.path.join(OUTPUT_DIR, qr_data['output_file'])
        desktop_path = os.path.join(DESKTOP_DIR, qr_data['desktop_file'])
        
        print(f'Generating QR for {qr_data["name"]}...')
        print(f'  URL: {qr_data["url"]}')
        
        # Generate QR code
        qr_img = generate_high_quality_qr(qr_data['url'], output_path, LOGO_PATH)
        
        # Save to project directory
        print(f'  Saved to: {output_path}')
        
        # Save to Desktop
        qr_img.save(desktop_path, 'PNG', dpi=(300, 300))
        print(f'  Saved to: {desktop_path}')
        
        # Print dimensions
        print(f'  Dimensions: {qr_img.size[0]}x{qr_img.size[1]} pixels')
        print(f'  File size: {os.path.getsize(output_path) / 1024:.1f} KB')
        print()
    
    print('✅ All high-quality QR codes generated successfully!')
    print('\nFiles created:')
    for qr_data in QRCODES:
        print(f'  • {qr_data["output_file"]} (project)')
        print(f'  • {qr_data["desktop_file"]} (Desktop)')


if __name__ == '__main__':
    main()
