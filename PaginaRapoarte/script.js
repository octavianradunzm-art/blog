// Page titles mapping
const pageTitles = {
    'dashboard': 'Dashboard',
    'newsletters': 'Newsletters',
    'abonati': 'Abonați',
    'ecommerce': 'E-Commerce',
    'automatizari': 'Automatizări',
    'formulare': 'Formulare',
    'site-uri': 'Site-uri',
    'rapoarte': 'Rapoarte',
    'setari': 'Setări',
    'integrari': 'Integrări',
    'sms': 'SMS',
    'tranzactional': 'Tranzacțional'
};

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Get all menu items
    const menuItems = document.querySelectorAll('.menu-item');
    const pageContents = document.querySelectorAll('.page-content');
    const pageTitle = document.getElementById('pageTitle');
    
    // Handle menu item clicks
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const href = this.getAttribute('href') || '';
            // Only handle "single-page app" navigation when the link is a hash (e.g. "#dashboard").
            // For real page links (e.g. "rapoarte.html"), allow the browser to navigate normally.
            if (!href.startsWith('#')) return;
            e.preventDefault();
            
            // Get the page name from data attribute
            const pageName = this.getAttribute('data-page');
            
            // Remove active class from all menu items
            menuItems.forEach(menuItem => {
                menuItem.classList.remove('active');
            });
            
            // Add active class to clicked menu item
            this.classList.add('active');
            
            // Hide all page contents
            pageContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show the selected page content
            const selectedPage = document.getElementById(`page-${pageName}`);
            if (selectedPage) {
                selectedPage.classList.add('active');
            }
            
            // Update page title
            if (pageTitle && pageTitles[pageName]) {
                pageTitle.textContent = pageTitles[pageName];
            }
            
            // Update URL hash without scrolling
            if (history.pushState) {
                history.pushState(null, null, `#${pageName}`);
            } else {
                window.location.hash = `#${pageName}`;
            }
        });
    });
    
    // Handle initial page load from URL hash
    const hash = window.location.hash.substring(1);
    if (hash === 'rapoarte') {
        window.location.href = 'rapoarte.html';
        return;
    }
    if (hash && pageTitles[hash]) {
        const menuItem = document.querySelector(`[data-page="${hash}"]`);
        if (menuItem) {
            menuItem.click();
        }
    }
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1);
        if (hash === 'rapoarte') {
            window.location.href = 'rapoarte.html';
            return;
        }
        if (hash && pageTitles[hash]) {
            const menuItem = document.querySelector(`[data-page="${hash}"]`);
            if (menuItem) {
                menuItem.click();
            }
        } else {
            // Default to dashboard
            const dashboardItem = document.querySelector('[data-page="dashboard"]');
            if (dashboardItem) {
                dashboardItem.click();
            }
        }
    });
    
    // List selector change handler
    const listSelector = document.getElementById('listSelector');
    if (listSelector) {
        listSelector.addEventListener('change', function() {
            console.log('Selected list:', this.value);
            // You can add functionality here to filter content based on selected list
        });
    }
    
    // Filter tabs functionality
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            const period = this.getAttribute('data-period');
            console.log('Selected period:', period);
            // You can add functionality here to filter data based on period
        });
    });
    
    // Quick action buttons
    const quickActionBtns = document.querySelectorAll('.quick-action-btn');
    quickActionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const actionText = this.querySelector('span:last-child').textContent;
            console.log('Quick action:', actionText);
            // You can add functionality here to handle quick actions
            // For example, navigate to create newsletter page, etc.
        });
    });
    
    // Primary button handler
    const primaryBtn = document.querySelector('.btn-primary');
    if (primaryBtn) {
        primaryBtn.addEventListener('click', function() {
            console.log('Create new campaign clicked');
            // You can add functionality here to open campaign creation modal/page
        });
    }
    
    // Report tabs functionality (for Rapoarte page)
    const reportTabs = document.querySelectorAll('.report-tab');
    const reportContents = document.querySelectorAll('.report-content');
    
    reportTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            reportTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get the report type
            const reportType = this.getAttribute('data-report');
            
            // Hide all report contents
            reportContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show the selected report content
            const selectedReport = document.getElementById(`report-${reportType}`);
            if (selectedReport) {
                selectedReport.classList.add('active');
            }
        });
    });
    
    // Chart control buttons
    const chartControlBtns = document.querySelectorAll('.chart-control-btn');
    chartControlBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons in the same group
            const parent = this.closest('.chart-controls');
            if (parent) {
                parent.querySelectorAll('.chart-control-btn').forEach(b => {
                    b.classList.remove('active');
                });
            }
            // Add active class to clicked button
            this.classList.add('active');
            console.log('Chart view changed:', this.textContent);
        });
    });
});
