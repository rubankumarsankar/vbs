const fs = require('fs');
const files = [
    'd:/2026/vps/components/sections/TextSection.jsx',
    'd:/2026/vps/components/sections/CTASection.jsx',
    'd:/2026/vps/components/sections/CardsSection.jsx',
    'd:/2026/vps/components/Footer.jsx',
    'd:/2026/vps/components/AffiliateLinksSection.jsx'
];

files.forEach(f => {
    if (fs.existsSync(f)) {
        let content = fs.readFileSync(f, 'utf8');
        // Replace ONLY in <section ... bg-slate-50 or <footer ... bg-slate-50
        content = content.replace(/(<(?:section|footer)[^>]*?className=\"[^\"]*?)(\s?bg-slate-50)(\s?.*?)\"/g, '$1$3\"');
        content = content.replace(/(<(?:section|footer)[^>]*?className=\"[^\"]*?)(bg-slate-50\s?)(\s?.*?)\"/g, '$1$3\"');
        fs.writeFileSync(f, content);
        console.log('Fixed background in ' + f);
    }
});
