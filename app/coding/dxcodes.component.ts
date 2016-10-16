import { Component, Input, OnInit, AfterViewInit } from "@angular/core";

import { DXCode } from "./dxcode.model";
import { DxCodeService } from './dxcode.service';

@Component({
  selector: "dxcodes",
  templateUrl: "app/coding/dxcodes.component.html",
  providers: [DxCodeService]
})
export class DXCodesComponent implements OnInit, AfterViewInit {
  @Input() claimId: string;
  dxcodes: Array<DXCode> = [];

  constructor(private _dxcodeService: DxCodeService) {}

  private loadDxCodes() {
    if (this.claimId == null) {
      this.dxcodes = [];
    } else{
      this._dxcodeService.getDxcodes({"claimId": this.claimId})
          .then(res => this.dxcodes = res)
    }
  }

  ngOnInit(): void {
    this.loadDxCodes();
  }

  ngAfterViewInit() {
    (<any>$('.floating.dropdown.button')).dropdown({
            direction: 'auto'
    });
  }

  clicked(dxcode: DXCode) {
    // http://stackoverflow.com/questions/35054004/how-to-use-jquery-with-javascript-in-angular-2
    // http://www.code-sample.com/2016/07/use-jquery-with-angular-2.html
    // https://www.youtube.com/watch?v=vrdHEBkGAow
    // http://www.syntaxsuccess.com/viewarticle/using-jquery-with-angular-2.0
    // https://www.jamestease.co.uk/blether/add-remove-or-toggle-classes-using-vanilla-javascript
    if (dxcode.commentClass == "") {
      dxcode.commentClass = "is-visible";
    } else {
      dxcode.commentClass = "";
    }
    // var _id = "#" + dxcode.id;
    // this.elementRef.nativeElement.querySelector(_id).textContent = "BAM!";
    // https://jsfiddle.net/4tuavhL2/
  }

  // showMessage(dxcode: DXCode) {
  //   console.log("show message activated");
  //   if (dxcode.reasonClass == "") {
  //     dxcode.reasonClass = "is-visible";
  //   } else {
  //     dxcode.reasonClass = "";
  //   }
  // }
}
