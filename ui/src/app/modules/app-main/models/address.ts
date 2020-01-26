export class Address {

  /* Attributes returned by Google Place lookup */
  address: string;
  city: string;
  province: string;
  provinceId: number;
  postcode: string;
  zip: string;
  country: string;
  country2Char: string;
  latitude: number;
  longitude: number;

  /* Additional manual or generated attributes */
  cntctId: number;
  cityProvince: string;
  cityProvinceCountry: string;
  oneLineFullAddress: string;
  companyName: string;
  email?: string;
  faxNumber?: string;
  phoneNumber: string;
  voicePhoneNumber: string;

  public static fromJsonString(jsonString: any): Address {
    return Object.assign(new Address(), jsonString);
  }

  public isAddressValid(): boolean {
    return !!this.address;
  }

  public getStreetAddress(): string {
    let streetAddress = '';
    streetAddress += this.address ? this.address : '';
    streetAddress = streetAddress.trim();
    return streetAddress;
  }

  public getCityProvincePostalCountry(): string {
    let cityProvincePostalCountry = this.cityProvince;
    if (cityProvincePostalCountry) {
      cityProvincePostalCountry = cityProvincePostalCountry.trim();
      cityProvincePostalCountry += this.postcode ? ' ' + this.postcode + (this.zip ? '-' + this.zip : '') + ', ' : '';
      cityProvincePostalCountry += this.country;
    }
    return cityProvincePostalCountry;
  }

  public getOnelineAddress(): string {
    let oneLineAddress = this.getStreetAddress();
    oneLineAddress = oneLineAddress && this.city ? oneLineAddress + ', ' +  this.city : oneLineAddress;
    oneLineAddress = oneLineAddress && this.province ? oneLineAddress + ', ' + this.province : oneLineAddress;
    oneLineAddress = oneLineAddress && this.postcode ? oneLineAddress + ', ' + this.postcode : oneLineAddress;
    oneLineAddress = oneLineAddress && this.country ? oneLineAddress + ', ' + this.country : oneLineAddress;
    return oneLineAddress;
  }

  public clone(): Address {
    return Object.assign(new Address(), JSON.parse(JSON.stringify(this)));
  }
}
