// This script updates all service pages to use the new service-page.css styling
// and ensures consistent alignment across all pages

import fs from 'fs';
import path from 'path';

const servicesDir = path.join(__dirname);
const servicePages = [
  'business-automation',
  'content-creation',
  'ecommerce-support',
  'realtime-support',
  'seo-optimization'
];

// CSS imports update function
function updateCssImports(content) {
  const importPattern = /\/\/ Add the CSS file to the document head[\s\S]*?}, \[\]);/;
  const newImports = `// Add the CSS files to the document head
  useEffect(() => {
    // Add service cards CSS
    const cardLink = document.createElement('link');
    cardLink.rel = 'stylesheet';
    cardLink.href = '/assets/css/service-cards.css';
    document.head.appendChild(cardLink);
    
    // Add service page CSS
    const pageLink = document.createElement('link');
    pageLink.rel = 'stylesheet';
    pageLink.href = '/assets/css/service-page.css';
    document.head.appendChild(pageLink);
    
    return () => {
      document.head.removeChild(cardLink);
      document.head.removeChild(pageLink);
    };
  }, []);`;
  
  return content.replace(importPattern, newImports);
}

// Header section update function
function updateHeaderSection(content) {
  const headerPattern = /return \(\s*<div className="container py-5">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
  const serviceName = content.match(/display-4 mb-3">(.*?)<\/h1>/)[1];
  const iconSrc = content.match(/src="(\/assets\/img\/.*?)"/)[1];
  const description = content.match(/lead mb-0">\s*(.*?)\s*<\/p>/)[1];
  
  const newHeader = `return (
    <div className="service-page-container">
      <div className="service-page-header">
        <Link href="/services" className="back-button">
          <span className="back-icon">←</span> Back to Services
        </Link>
        <h1 className="service-page-title">${serviceName}</h1>
        <div className="service-icon-container">
          <div className="service-icon-large">
            <Image src="${iconSrc}" alt="${serviceName}" width={80} height={80} />
          </div>
          <p className="service-page-description">
            ${description}
          </p>
        </div>
      </div>`;
  
  return content.replace(headerPattern, newHeader);
}

// Process each service page
servicePages.forEach(servicePage => {
  const pagePath = path.join(servicesDir, servicePage, 'page.tsx');
  
  if (fs.existsSync(pagePath)) {
    console.log(`Updating ${servicePage} page...`);
    let content = fs.readFileSync(pagePath, 'utf8');
    
    // Update CSS imports
    content = updateCssImports(content);
    
    // Update header section
    content = updateHeaderSection(content);
    
    // Update card sections to use service-section
    content = content.replace(/card shadow-sm mb-4/g, 'service-section');
    content = content.replace(/card-body/g, '');
    content = content.replace(/card-title/g, 'service-section-title');
    
    // Update list items
    content = content.replace(/list-group list-group-flush/g, 'service-list');
    content = content.replace(/list-group-item/g, 'service-list-item');
    
    // Update sidebar sections
    content = content.replace(/card shadow-sm mb-4/g, 'service-sidebar-card');
    content = content.replace(/card shadow-sm/g, 'service-sidebar-card');
    content = content.replace(/card-title/g, 'service-sidebar-title');
    content = content.replace(/btn btn-primary w-100/g, 'service-cta-button');
    content = content.replace(/text-decoration-none/g, 'related-service-link');
    
    // Write updated content back to file
    fs.writeFileSync(pagePath, content, 'utf8');
    console.log(`Updated ${servicePage} page successfully!`);
  } else {
    console.log(`${servicePage} page not found!`);
  }
});

console.log('All service pages updated successfully!');
