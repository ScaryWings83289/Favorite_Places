class Place {
  constructor(title, imageUri, address, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location; // { lat: 0.1234, lang: 127.234 }
    this.id = new Date().toISOString() + Math.random().toString();
  }
}
