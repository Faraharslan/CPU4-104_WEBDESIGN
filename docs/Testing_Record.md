# Testing Record

**Student:** Farah Arslan  
**Project:** NovaVolt Electronics

| Test | Expected result | Result |
|---|---|---|
| Open home page | Header, hero and four featured products appear | Pass |
| Open products page | Twelve product cards appear | Pass |
| Search for “laptop” | Only the laptop is shown | Pass |
| Choose Audio filter | Three audio products are shown | Pass |
| Sort products | Cards change into the selected price order | Pass |
| Open a product | Correct name, price, image and features appear | Pass |
| Add two products | Cart counter changes to two | Pass |
| Increase quantity | Item quantity and total increase | Pass |
| Decrease quantity | Item quantity and total decrease | Pass |
| Remove item | Item disappears and total updates | Pass |
| Submit empty checkout form | Clear validation messages appear | Pass |
| Submit empty contact form | Clear validation messages appear | Pass |
| Test at 768 px | Product grid and navigation fit tablet width | Pass |
| Test at 390 px | Mobile menu opens and page has no sideways scrolling | Pass |
| Keyboard test | Links, buttons and fields have visible focus | Pass |

## Accessibility improvements

1. **Colour contrast:** dark navy text and buttons are used against light backgrounds so information is easier to read.
2. **Form labels and errors:** every field has a visible label. Invalid fields receive `aria-invalid="true"` and a nearby error message.
3. **Keyboard access:** a skip link and visible focus outline help users who do not use a mouse.
4. **Images and structure:** meaningful images have alternative text and pages use headings, navigation, main content and footer landmarks.

## Responsive checks

- Desktop: 1440 × 1000
- Tablet: 768 × 1024
- Mobile: 390 × 844

The screenshots in the `evidence` folder show the final responsive layout.
