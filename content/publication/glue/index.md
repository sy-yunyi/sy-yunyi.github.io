---
title: 'Rethinking the Security Threats of Stale DNS Glue Records'

# Authors
# If you created a profile for a user (e.g. the default `admin` user), write the username (folder name) here
# and it will be replaced with their full name and linked to their profile.
authors:
  - admin
  - Baojun Liu
  - Haixin Duan
  - Min Zhang
  - Xiang Li
  - Fan Shi
  - Chengxi Xu
  - Eihal Alowaisheq

# Author notes (optional)
author_notes:
  - 'Equal contribution'
  - 'Equal contribution'

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

abstract: The Domain Name System (DNS) fundamentally relies on glue records to provide authoritative nameserver IP addresses, enabling essential in-domain delegation. While previous studies have identified potential security risks associated with glue records, the exploitation of these records, especially in the context of out-domain delegation, remains unclear due to their inherently low trust level and the diverse ways in which resolvers handle them. This paper undertakes the first systematic exploration of the potential threats posed by DNS glue records, uncovering significant real-world security risks. We empirically identify that 23.18% of glue records across 1,096 TLDs are outdated yet still served in practice. More concerningly, through reverse engineering 9 mainstream DNS implementations (e.g., BIND 9 and Microsoft DNS), we reveal manipulable behaviors associated with glue records. The convergence of these systemic issues allows us to propose the novel threat model that could enable large-scale domain hijacking and denial-of-service attacks. Furthermore, our analysis determines over 193,558 exploitable records exist, placing more than 6 million domains at risk. Additional measurement studies on global open resolvers demonstrate that 90% of them use unvalidated and outdated glue records, including OpenDNS and AliDNS. Our responsible disclosure has already prompted mitigation efforts by affected stakeholders. Microsoft DNS, PowerDNS, OpenDNS, and Alibaba Cloud DNS have acknowledged our reported vulnerability. In summary, this work highlights that glue records constitute a forgotten foundation of DNS architecture requiring renewed security prioritization.

# Summary. An optional shortened abstract.
summary: This paper undertakes the first systematic exploration of the potential threats posed by DNS glue records, uncovering significant real-world security risks.

tags:
  - DNS, Glue record, domain takeover

# Display this page in the Featured widget?
featured: true

# Custom links (uncomment lines below)
# links:
# - name: Custom Link
#   url: http://example.org

url_pdf: 'https://www.usenix.org/system/files/usenixsecurity24-zhang-yunyi-rethinking.pdf'
url_code: ''
url_dataset: ''
url_poster: ''
url_project: ''
url_slides: 'https://www.usenix.org/system/files/usenixsecurity24_slides-zhang-yunyi-rethinking.pdf'
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

{{% callout note %}}
Click the _Cite_ button above to demo the feature to enable visitors to import publication metadata into their reference management software.
{{% /callout %}}

{{% callout note %}}
Create your slides in Markdown - click the _Slides_ button to check out the example.
{{% /callout %}}

Add the publication's **full text** or **supplementary notes** here. You can use rich formatting such as including [code, math, and images](https://docs.hugoblox.com/content/writing-markdown-latex/).
