// main.js - 主要脚本文件

document.addEventListener('DOMContentLoaded', () => {
    // 初始化导航菜单响应式功能
    initMobileMenu();
    
    // 加载新闻数据
    loadNews();
    
    // 加载并解析论文
    loadPublications();
    
    // 初始化筛选按钮
    initFilterButtons();
});

// 移动端菜单功能
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // 点击链接后关闭菜单
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// 加载新闻数据
async function loadNews() {
    try {
        const response = await fetch('data/news.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const newsData = await response.json();
        
        // 排序新闻，最新的排在前面
        newsData.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        const newsListContainer = document.getElementById('newsList');
        const showMoreButton = document.getElementById('showMoreNews');
        
        if (!newsListContainer || !showMoreButton) {
            console.error('News container or show more button not found');
            return;
        }
        
        // 清空容器
        newsListContainer.innerHTML = '';
        
        // 初始显示前6条新闻
        const initialDisplayCount = 6;
        const totalNewsItems = newsData.length;
        
        // 创建所有新闻项，但只显示前面部分
        newsData.forEach((item, index) => {
            const newsItem = createNewsItem(item);
            
            if (index >= initialDisplayCount) {
                newsItem.style.display = 'none';
                newsItem.classList.add('hidden-news');
            }
            
            newsListContainer.appendChild(newsItem);
        });
        
        // 处理"显示更多"按钮
        if (totalNewsItems <= initialDisplayCount) {
            showMoreButton.style.display = 'none';
        } else {
            showMoreButton.style.display = 'block';
            showMoreButton.setAttribute('data-expanded', 'false');
            showMoreButton.innerHTML = '<i class="fas fa-chevron-down"></i> Show More News';
            
            // 确保事件监听器只添加一次
            showMoreButton.removeEventListener('click', toggleNewsVisibility);
            showMoreButton.addEventListener('click', toggleNewsVisibility);
        }
    } catch (error) {
        console.error('Failed to load news data:', error);
        const newsListContainer = document.getElementById('newsList');
        if (newsListContainer) {
            newsListContainer.innerHTML = 
                '<p class="error-message">Failed to load news. Please try again later.</p>';
        }
    }
}

// 切换新闻的显示/隐藏状态
function toggleNewsVisibility() {
    const hiddenNews = document.querySelectorAll('.hidden-news');
    const showMoreButton = document.getElementById('showMoreNews');
    
    const isExpanded = showMoreButton.getAttribute('data-expanded') === 'true';
    
    if (!isExpanded) {
        // 展开新闻
        hiddenNews.forEach(item => item.style.display = 'flex');
        showMoreButton.innerHTML = '<i class="fas fa-chevron-up"></i> Show Less News';
        showMoreButton.setAttribute('data-expanded', 'true');
    } else {
        // 折叠新闻
        hiddenNews.forEach(item => item.style.display = 'none');
        showMoreButton.innerHTML = '<i class="fas fa-chevron-down"></i> Show More News';
        showMoreButton.setAttribute('data-expanded', 'false');
    }
}


// 创建单个新闻项
function createNewsItem(item) {
    const newsItem = document.createElement('div');
    newsItem.className = 'news-item';
    
    // 格式化日期
    const date = new Date(item.date);
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        // day: 'numeric'
    });
    
    newsItem.innerHTML = `
        <div class="news-date">${formattedDate}</div>
        <div class="news-content">${item.content}</div>
    `;
    
    return newsItem;
}

// 初始化论文筛选按钮
function initFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 更新活动状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // 筛选论文
            const yearFilter = button.getAttribute('data-year');
            filterPublications(yearFilter);
        });
    });
}

// 筛选论文
function filterPublications(yearFilter) {
    const publications = document.querySelectorAll('.publication-card');
    
    publications.forEach(publication => {
        const publicationYear = publication.getAttribute('data-year');
        
        if (yearFilter === 'all' || publicationYear === yearFilter) {
            publication.style.display = 'block';
        } else {
            publication.style.display = 'none';
        }
    });
}

// 调用publicationParser.js中的函数加载论文
function loadPublications() {
    // publicationParser.js将实现此功能
    loadPublicationData();
}
