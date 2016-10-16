import { Component, Input, OnInit } from "@angular/core";

import { CPTCode } from "./cptcode.model";
import { CptCodeService } from './cptcode.service';

@Component({
  selector: "cptcodes",
  templateUrl: "app/coding/cptcodes.component.html",
  providers: [CptCodeService]
})
export class CPTCodesComponent{
  @Input() claimId: string;
  cptcodes: Array<CPTCode> = [];

  constructor(private _cptcodeService: CptCodeService) {}

  private loadCptCodes() {
    if (this.claimId == null) {
      this.cptcodes = [];
    } else {
      this._cptcodeService.getCptCodes({"claimId": this.claimId})
        .then(res => this.cptcodes = res)
    }
  }

  ngOnInit(): void {
    this.loadCptCodes();
  }

  clicked(cptcode: CPTCode) {
    if (cptcode.class == "") {
      cptcode.class = "is-visible";
    } else {
      cptcode.class = "";
    }
  }
}
