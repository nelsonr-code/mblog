class HtmlBuilderService {
  static htmlTagMapper = {
    video: (src) => `<video controls src="${src}"></video>`,
    photo: (src) => `<image width="auto" src="${src}"></image>`,
    hk: (k, content) => `<h${k}> ${content} </h${k}>`,
  };

  constructor() {
    this._html = "";
  }

  appendVideo(src) {
    this._html += `
        ${HtmlBuilderService.htmlTagMapper.video(src)}
        <br />
      `;
  }

  appendImage(src) {
    this._html += `
          ${HtmlBuilderService.htmlTagMapper.photo(src)}
          <br />
        `;
  }

  appendH(n, content) {
    this._html += `
              ${HtmlBuilderService.htmlTagMapper.hk(n, content)}
              <br />
            `;
  }

  html() { return this._html; }
}

class WordpressPostConfig {
  constructor(
    date,
    slug,
    status,
    password,
    title,
    content,
    author,
    excerpt,
    featured_media,
    comment_status,
    ping_status,
    format,
    meta,
    sticky,
    template,
    categories,
    tags
  ) {
    this.date = date;
    this.slug = slug;
    this.status = status;
    this.password = password;
    this.title = title || "";
    this.content = content || "";
    this.author = author;
    this.excerpt = excerpt;
    this.featured_media = featured_media;
    this.comment_status = comment_status;
    this.ping_status = ping_status;
    this.format = format;
    this.meta = meta;
    this.sticky = sticky;
    this.template = template;
    this.categories = categories;
    this.tags = tags;
  }

  setDate(date) {
    date && (this.date = date);
  }

  setSlug(slug) {
    slug && (this.slug = slug);
  }

  setStatus(status) {
    status && (this.status = status);
  }

  setPassword(password) {
    password && (this.password = password);
  }

  setTitle(title) {
    title && (this.title = title);
  }

  setContent(content, attachments) {
    if (!attachments) {
      this.content = content;
      return;
    }

    const htmlBuilder = new HtmlBuilderService();

    attachments.forEach(({ resources, title }) => {
      htmlBuilder.appendH(2, title || "123123");
      if(resources.length) {
        resources.forEach(({ src, type }) => {
          if(type.match(/video/)) {
            htmlBuilder.appendVideo(src);
          } else if(type == "photo") {
            htmlBuilder.appendImage(src);            
          }
        })
      }
    });

    this.content = htmlBuilder.html();
  }

  setCategories(categories) {
    categories && (this.categories = categories);
  }
}

export class WordpressPostConfigMap {
  static fromWebRequest(rawData) {
    const model = new WordpressPostConfig();

    model.setTitle(rawData.title);
    model.setContent(rawData.content, rawData.attachments);
    model.setSlug(rawData.slug);
    model.setStatus("publish");
    model.setCategories(rawData.categories);

    return model;
  }
}
