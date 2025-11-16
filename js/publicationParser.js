// 全局变量
let publicationsData = [];
const yearsSet = new Set(['all']);

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', async function() {
    console.log("DOM 加载完成，开始初始化论文部分...");
    await loadPublicationData();
});

// 加载论文数据
async function loadPublicationData() {
    try {
        console.log("开始加载论文数据...");
        const publicationsListContainer = document.getElementById('publicationsList');
        
        if (!publicationsListContainer) {
            console.error("找不到publicationsList容器");
            return;
        }
        
        // 显示加载中状态
        publicationsListContainer.innerHTML = '<div class="loading">Loading publications...</div>';
        
        // 检查publications-list.json是否存在
        const response = await fetch('data/publications-list.json');
        if (!response.ok) {
            console.error(`无法加载publications-list.json: ${response.status} ${response.statusText}`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        console.log("成功获取publications-list.json");
        const filesList = await response.json();
        console.log(`找到${filesList.length}个论文文件:`, filesList);
        
        if (!Array.isArray(filesList) || filesList.length === 0) {
            console.error("publications-list.json为空或格式错误");
            throw new Error("Publications list is empty or not an array");
        }
        
        const publicationPromises = filesList.map(async filename => {
            try {
                console.log(`正在加载论文: ${filename}`);
                const response = await fetch(`data/publications/${filename}`);
                if (!response.ok) {
                    console.error(`加载论文文件失败: ${filename}, 状态: ${response.status}`);
                    return null;
                }
                const markdownContent = await response.text();
                console.log(`成功加载论文: ${filename}, 内容长度: ${markdownContent.length}字符`);
                return parsePublicationMarkdown(markdownContent, filename);
            } catch (error) {
                console.error(`加载论文 ${filename} 时出错:`, error);
                return null;
            }
        });
        
        // 等待所有论文加载完成
        const results = await Promise.all(publicationPromises);
        publicationsData = results.filter(pub => pub !== null);
        
        console.log(`成功解析${publicationsData.length}篇论文:`, publicationsData);
        
        if (publicationsData.length === 0) {
            publicationsListContainer.innerHTML = '<p class="no-results">No publications found.</p>';
            return;
        }
        
        // 收集所有年份用于筛选
        publicationsData.forEach(pub => {
            if (pub && pub.year) {
                yearsSet.add(pub.year.toString());
            }
        });
        
        // 根据年份排序论文（最新的排在前面）
        publicationsData.sort((a, b) => b.year - a.year);
        
        // 动态创建年份筛选按钮
        createYearFilterButtons();
        
        // 显示论文
        renderPublications();
        
    } catch (error) {
        console.error('加载论文数据失败:', error);
        const publicationsListContainer = document.getElementById('publicationsList');
        publicationsListContainer.innerHTML = '<p class="no-results">Failed to load publications.</p>';
    }
}

// 解析Markdown格式的论文数据
function parsePublicationMarkdown(markdownContent, filename) {
    try {
        console.log(`开始解析Markdown内容: ${filename}...`);
        
        // 提取YAML前置数据
        // const yamlRegex = /^---\n([\s\S]*?)\n---/;
        const yamlRegex = /^\s*[-]{3,}\s*\n([\s\S]*?)\n\s*[-]{3,}\s*/;
        const yamlMatch = markdownContent.match(yamlRegex);
        
        if (!yamlMatch) {
            console.error(`无效的Markdown格式: ${filename} 未找到YAML前置数据`);
            console.log(`Markdown内容前100字符: ${markdownContent.substring(0, 100)}`);
            return null;
        }
        
        const yamlContent = yamlMatch[1];
        console.log(`成功提取YAML内容 ${filename}:`, yamlContent);
        
        // 解析YAML内容
        const publication = {};
        
        // 提取各个字段
        const fields = [
            { key: 'title', regex: /title:\s*"([^"]+)"/ },
            { key: 'authors', regex: /authors:\s*"([^"]+)"/ },
            { key: 'venue', regex: /venue:\s*"([^"]+)"/ },
            { key: 'year', regex: /year:\s*(\d+)/ },
            { key: 'abstract', regex: /abstract:\s*"([^"]+)"/ },
            { key: 'pdf', regex: /pdf:\s*"([^"]+)"/ },
            { key: 'slides', regex: /slides:\s*"([^"]+)"/ },
            { key: 'github', regex: /github:\s*"([^"]+)"/ },
            { key: 'video', regex: /video:\s*"([^"]+)"/ },
            { key: 'presentation', regex: /presentation:\s*(true|false)/ },
            { key: 'presentation_type', regex: /presentation_type:\s*"([^"]+)"/ },
            { key: 'presentation_event', regex: /presentation_event:\s*"([^"]+)"/ },
            { key: 'award', regex: /award:\s*"([^"]*)"/ }
        ];
        
        fields.forEach(field => {
            const match = yamlContent.match(field.regex);
            if (match) {
                publication[field.key] = field.key === 'year' ? parseInt(match[1]) : match[1];
                console.log(`${filename} - 解析字段 ${field.key}: ${publication[field.key]}`);
            } else {
                console.log(`${filename} - 未找到字段 ${field.key}`);
            }
        });
        
        // 处理布尔值
        if (publication.presentation) {
            publication.presentation = publication.presentation === 'true';
        }
        
        // 验证必需字段
        if (!publication.title || !publication.authors || !publication.year) {
            console.error(`${filename} - 论文缺少必需字段(标题、作者或年份)`);
            return null;
        }
        
        console.log(`成功解析论文 ${filename}: ${publication.title}`);
        return publication;
    } catch (error) {
        console.error(`解析论文Markdown ${filename} 时出错:`, error);
        return null;
    }
}

// 渲染论文列表
function renderPublications(filter = 'all') {
    console.log("渲染论文列表...");
    const publicationsListContainer = document.getElementById('publicationsList');
    
    if (!publicationsListContainer) {
        console.error("找不到publicationsList容器");
        return;
    }
    
    if (!publicationsData || publicationsData.length === 0) {
        publicationsListContainer.innerHTML = '<p class="no-results">No publications found.</p>';
        console.warn("没有论文数据可显示");
        return;
    }
    
    // 清空容器
    publicationsListContainer.innerHTML = '';
    
    // 筛选论文
    let filteredPublications = publicationsData;
    if (filter !== 'all') {
        const filterYear = parseInt(filter);
        filteredPublications = publicationsData.filter(pub => pub.year === filterYear);
    }
    
    if (filteredPublications.length === 0) {
        publicationsListContainer.innerHTML = '<p class="no-results">No publications found for the selected year.</p>';
        return;
    }
    
    // 添加每篇论文
    filteredPublications.forEach(pub => {
        // 创建论文卡片
        const card = document.createElement('div');
        card.className = 'publication-card';
        card.setAttribute('data-year', pub.year);
        
        // 添加标题和作者
        const titleElement = document.createElement('h3');
        titleElement.className = 'pub-title';
        titleElement.textContent = pub.title;
        card.appendChild(titleElement);
        
        const authorElement = document.createElement('p');
        authorElement.className = 'pub-authors';
        authorElement.textContent = pub.authors;
        card.appendChild(authorElement);
        
        // 添加发表信息
        const venueElement = document.createElement('p');
        venueElement.className = 'pub-venue';
        venueElement.textContent = pub.venue;
        card.appendChild(venueElement);
        
        // 添加摘要（如果存在）
        if (pub.abstract) {
            const abstractElement = document.createElement('div');
            abstractElement.className = 'pub-abstract';
            
            const abstractTitle = document.createElement('p');
            abstractTitle.className = 'abstract-title';
            abstractTitle.textContent = '摘要';
            abstractElement.appendChild(abstractTitle);
            
            const abstractContent = document.createElement('p');
            abstractContent.className = 'abstract-content';
            abstractContent.textContent = pub.abstract;
            abstractElement.appendChild(abstractContent);
            
            card.appendChild(abstractElement);
        }
        
        // 添加链接
        const linksContainer = document.createElement('div');
        linksContainer.className = 'pub-links';
        
        // PDF链接
        if (pub.pdf) {
            const pdfLink = createLink(pub.pdf, 'PDF', 'fa-file-pdf');
            linksContainer.appendChild(pdfLink);
        }
        
        // 幻灯片链接
        if (pub.slides) {
            const slidesLink = createLink(pub.slides, 'Slides', 'fa-file-powerpoint');
            linksContainer.appendChild(slidesLink);
        }
        
        // GitHub链接
        if (pub.github) {
            const githubLink = createLink(pub.github, 'Code', 'fa-github');
            linksContainer.appendChild(githubLink);
        }
        
        // 视频链接
        if (pub.video) {
            const videoLink = createLink(pub.video, 'Video', 'fa-video');
            linksContainer.appendChild(videoLink);
        }
        
        card.appendChild(linksContainer);
        
        // 添加演示信息和奖项（如果存在）
        if (pub.presentation && pub.presentation_type) {
            const presentationElement = document.createElement('div');
            presentationElement.className = 'pub-presentation';
            presentationElement.innerHTML = `<i class="fas fa-award"></i> ${pub.presentation_type} at ${pub.presentation_event || pub.venue}`;
            card.appendChild(presentationElement);
        }
        
        if (pub.award) {
            const awardElement = document.createElement('div');
            awardElement.className = 'pub-award';
            awardElement.innerHTML = `<i class="fas fa-trophy"></i> ${pub.award}`;
            card.appendChild(awardElement);
        }
        
        // 将卡片添加到容器
        publicationsListContainer.appendChild(card);
    });
}

// 创建链接元素
function createLink(url, text, iconClass) {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.className = 'pub-link';
    link.innerHTML = `<i class="fas ${iconClass}"></i> ${text}`;
    return link;
}

// 创建年份筛选按钮
function createYearFilterButtons() {
    console.log("创建年份筛选按钮...");
    const yearFiltersContainer = document.getElementById('yearFilters');
    
    if (!yearFiltersContainer) {
        console.error("找不到yearFilters容器");
        return;
    }
    
    // 清空容器
    yearFiltersContainer.innerHTML = '';
    
    // 排序年份（降序）
    const sortedYears = Array.from(yearsSet).sort((a, b) => {
        if (a === 'all') return -1;
        if (b === 'all') return 1;
        return parseInt(b) - parseInt(a);
    });
    
    // 为每个年份创建按钮
    sortedYears.forEach(year => {
        const button = document.createElement('button');
        button.className = 'filter-button';
        button.textContent = year === 'all' ? '所有年份' : year;
        button.setAttribute('data-year', year);
        
        // 设置默认选中
        if (year === 'all') {
            button.classList.add('active');
        }
        
        // 添加点击事件
        button.addEventListener('click', function() {
            // 更改选中状态
            document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 筛选论文
            renderPublications(year);
        });
        
        yearFiltersContainer.appendChild(button);
    });
}
