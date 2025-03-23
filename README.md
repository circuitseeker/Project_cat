# Catterpillar - AI & Robotics Solutions

A modern and responsive landing page for Catterpillar, a company providing AI and robotics solutions for startups and creators.

## Features

- Modern and responsive design
- Interactive UI elements
- Smooth animations and transitions
- Mobile-friendly layout
- SVG cat logo embedded directly in the HTML
- Testimonial slider
- Contact form with validation
- Tab-based content sections

## Partner Logos

The landing page displays the logos of our partner brands:

1. **Circuit Seeker** - Logo URL: https://i.imgur.com/0Q58hPP.png
   - Local file path reference: `images/circuit-seeker-logo.png`

2. **Program Bee** - Logo URL: https://i.imgur.com/U6MxJcJ.png
   - Local file path reference: `images/program-bee-logo.png`

## Technologies Used

- HTML5
- CSS3 with custom properties (variables)
- Vanilla JavaScript
- Font Awesome icons
- Google Fonts (Poppins)

## Project Structure

```
catterpillar-web/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## Getting Started

1. Clone this repository
2. Open `index.html` in your browser

## Customization

### Colors

The website uses CSS variables for easy color customization. To change the color scheme, edit the `:root` section in the `styles.css` file:

```css
:root {
    --primary-color: #5364FF;
    --secondary-color: #f8c83c;
    --dark-color: #252A34;
    --light-color: #EAEAEA;
    --text-color: #333;
    --light-text: #777;
    --bg-color: #FFFFFF;
    /* other variables */
}
```

### Logo

The cat logo is created using SVG directly embedded in the HTML. You can customize it by modifying the SVG code in the `index.html` file.

### Content

Update the content in the `index.html` file to match your specific needs and offerings.

## Future Improvements

- Add a blog section
- Implement dark mode
- Add more interactive elements
- Create product showcase pages
- Integrate a newsletter subscription
- Add multilingual support

## License

This project is licensed under the MIT License.

## Created By

Built with ❤️ for Catterpillar 

## Local Development

For local development and testing, you can:

1. Open `index.html` in your browser
2. The images folder contains HTML reference files for each logo

## Image Usage

To use local images instead of remote URLs:
1. Save the images from the provided URLs to the `images` folder with the specified filenames
2. Update the image src attributes in `index.html` to use the local paths 