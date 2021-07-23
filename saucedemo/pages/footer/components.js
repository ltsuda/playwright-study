const footerLocators = {
  twitterSocialLink: ".footer >> .social_twitter > a",
  facebookSocialLink: ".footer >> .social_facebook > a",
  linkdinSocialLink: ".footer >> .social_linkedin > a",
  copyrightText: ".footer >> footer_copy",
  footerImage: ".footer >> footer_robot",
}

class FooterComponents {
  constructor(page) {
    this.page
  }

  async twitterLink() {
    return await this.page.$(footerLocators.twitterSocialLink)
  }

  async facebookLink() {
    return await this.page.$(footerLocators.facebookSocialLink)
  }

  async linkedinLink() {
    return await this.page.$(footerLocators.linkdinSocialLink)
  }

  async copyrightText() {
    return await this.page.$(footerLocators.copyrightText)
  }

  async robotImage() {
    return await this.page.$(footerLocators.footerImage)
  }
}

module.exports = {
  FooterComponents,
  footerLocators,
}
