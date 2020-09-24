export class FacebookAttachmentData {
  constructor(media, target, title, type, url, subattachments = null) {
    this.media = media;
    this.target = target;
    this.title = title;
    this.type = type;
    this.url = url;
    if (subattachments) {
      this.subattachments = subattachments;
    }
  }

  getAttachments2() {
    if (!this.subattachments) {
      if (this.type === "video" || this.type === "video_inline") {
        return [
          {
            src: this.media.source,
            title: this.title,
            type: this.type,
          },
        ];
      } else if (this.type === "photo") {
        return [
          {
            src: this.media.image.src,
            title: this.title,
            type: this.type,
          },
        ];
      } else {
        return [
          {
            title: this.title,
            type: this.type,
          },
        ];
      }
    }
  }

  getAttachments() {
    if (!this.subattachments) {
      return {
        resources: [
          {
            src:
              this.type === "video" || this.type === "video_inline"
                ? this.media.source
                : this.media.image.src,
            title: this.title,
            type: this.type,
          },
        ],
      };
    }

    return {
      resources: [].concat.apply(
        [],
        this.subattachments.data.map((e) => e.getAttachments2())
      ),
      title: this.title,
    };
  }
}

export class FacebookPost {
  constructor(
    message,
    attachments,
    id,
    created_time,
    description,
    properties,
    shares
  ) {
    this.message = message;
    this.attachments = attachments;
    this.id = id;
    this.created_time = created_time;
    this.description = description;
    this.properties = properties;
    this.shares = shares;
  }

  getDescription() {
    return this.description;
  }

  toPreview() {
    return {
      message: this.message,
      created_time: this.created_time,
      attachments: this.getAttachments(),
    };
  }

  getAttachments() {
    if (!this.attachments?.data?.length) return [];

    let { data } = this.attachments;

    return data
      .filter((facebookData) => {
        return facebookData instanceof FacebookAttachmentData;
      })
      .map((facebookData) => facebookData.getAttachments());
  }

  getResume() {
    return {
      id: this.id,
      message: this.message,
      created_time: this.created_time,
      attachments: this.getAttachments(),
      description: this.getDescription(),
    };
  }
}

export class FacebookPostMap {
  static fromPrimitives(rawData) {
    if (rawData.attachments?.data) {
      rawData.attachments.data = rawData.attachments.data.map(
        FacebookAttachmentDataMap.fromPrimitives
      );
    }
    return new FacebookPost(
      rawData.message,
      rawData.attachments,
      rawData.id,
      rawData.created_time,
      rawData.description,
      rawData.properties,
      rawData.shares
    );
  }
}

export class FacebookAttachmentDataMap {
  static fromPrimitives(rawData) {
    if (rawData.subattachments && rawData.subattachments.data) {
      rawData.subattachments.data = rawData.subattachments.data.map(
        (e) =>
          new FacebookAttachmentData(e.media, e.target, e.title, e.type, e.url)
      );
    }

    return new FacebookAttachmentData(
      rawData.media,
      rawData.target,
      rawData.title,
      rawData.type,
      rawData.url,
      rawData.subattachments
    );
  }
}
