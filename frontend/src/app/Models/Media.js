export class Media {
  constructor(title, resources) {
    this.title = title;
    this.resources = resources;
  }
}

export class MapFacebookMedia {

  static toVm(rawData) {
    let { title, resources } = rawData;
    return new Media(
      title,
      resources
    );
  }
}