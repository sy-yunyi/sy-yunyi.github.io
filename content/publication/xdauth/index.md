---
title: 'Cross the Zone: Toward a Covert Domain Hijacking via Shared DNS Infrastructure'

# Authors
# If you created a profile for a user (e.g. the default `admin` user), write the username (folder name) here
# and it will be replaced with their full name and linked to their profile.
authors:
  - admin
  - Mingming Zhang
  - Baojun Liu
  - Zhan Liu
  - Jia Zhang
  - Haixin Duan
  - Min Zhang
  - Fan Shi
  - Chengxi Xu

# Author notes (optional)
# author_notes:
#   - 'Equal contribution'
#   - 'Equal contribution'

date: '2024-08-16'
doi: ''

# Schedule page publish date (NOT publication's date).
publishDate: '2024-08-16'

# Publication type.
# Accepts a single type but formatted as a YAML list (for Hugo requirements).
# Enter a publication type from the CSL standard.
publication_types: ['paper-conference']

# Publication name and optional abbreviated publication name.
publication: In *USENIX Security 2024*
publication_short: In *USENIX Sec'24*

abstract: Domain Name System (DNS) establishes clear responsibility boundaries among nameservers for managing DNS records via authoritative delegation. However, the rise of thirdparty public services has blurred this boundary. In this paper, we uncover a novel attack surface, named XDAuth, arising from public authoritative nameserver infrastructure's failure to isolate data across zones adequately. This flaw enables adversaries to inject arbitrary resource records across logical authority boundaries and covertly hijack domain names without authority. Unlike prior research on stale NS records, which concentrated on domain names delegated to expired nameservers or those of hosting service providers, XDAuth targets enterprises that maintain their authoritative domain names. We demonstrate that XDAuth is entirely feasible, and through comprehensive measurements, we identify 12 vulnerable providers (e.g., Amazon Route 53, NSONE, and DigiCert DNS), affecting 125,124 domains of notable enterprises, including the World Bank, and the BBC. Moreover, we responsibly disclose the issue to the affected vendors. Some DNS providers and enterprises (e.g., Amazon Route 53) have recognized the issue and are adopting mitigation measures based on our suggestions.

# Summary. An optional shortened abstract.
summary: In this paper, we uncover a novel attack surface, named XDAuth, arising from public authoritative nameserver infrastructure's failure to isolate data across zones adequately. This flaw enables adversaries to inject arbitrary resource records across logical authority boundaries and covertly hijack domain names without authority.

tags:
  - DNS, domain takeover

# Display this page in the Featured widget?
featured: true

# Custom links (uncomment lines below)
# links:
# - name: Custom Link
#   url: http://example.org

url_pdf: 'https://www.usenix.org/system/files/usenixsecurity24-zhang-yunyi-zone.pdf'
url_code: ''
url_dataset: ''
url_poster: ''
url_project: ''
url_slides: 'https://www.usenix.org/system/files/usenixsecurity24_slides-zhang-yunyi-zone.pdf'
url_source: ''
url_video: ''

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# image:
#   caption: 'Image credit: [**Unsplash**](https://unsplash.com/photos/pLCdAaMFLTE)'
#   focal_point: ''
#   preview_only: false

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
projects:
  - example

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
slides: example
---

<!-- {{% callout note %}}
Click the _Cite_ button above to demo the feature to enable visitors to import publication metadata into their reference management software.
{{% /callout %}}

{{% callout note %}}
Create your slides in Markdown - click the _Slides_ button to check out the example.
{{% /callout %}}

Add the publication's **full text** or **supplementary notes** here. You can use rich formatting such as including [code, math, and images](https://docs.hugoblox.com/content/writing-markdown-latex/). -->
