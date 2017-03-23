import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { CPTCode } from "./cptcode.model";
import { CptCodeService } from './cptcode.service';

class CptCodeCss {
  commentClass = "";
  commentIconClass = "";

  constructor(cptcode: CPTCode) {
    if(cptcode.comment != "") {
      this.commentIconClass = "is-selected";
    }
  }
}

@Component({
  selector: "cptcodes",
  templateUrl: "./cptcodes.component.html",
  providers: [CptCodeService]
})
export class CPTCodesComponent{
  @Input() claimId: string;
  cptcodes: Array<CPTCode> = [];
  private addCptCodeForm: FormGroup;
  private _selectedCptxId = -1;
  // private _selectedModifierId = -1;
  private cptcodeCss: Array<CptCodeCss> = [];
  private allowToAdd: boolean;

  constructor(
    private _cptcodeService: CptCodeService,
    private _fb: FormBuilder,
    private _toastr: ToastsManager) {
      this.addCptCodeForm = _fb.group({
        cptcode: ['', Validators.required],
        description: ['', Validators.required],
        modifiers: ['', Validators.required],
        comment: ['']
      });
    this.allowToAdd = false;
  }

  private loadCptCodes() {
    if (this.claimId == null) {
      this.cptcodes = [];
      this.cptcodeCss = [];
    } else {
      this._cptcodeService.getCptCodes({"claimId": this.claimId})
        .then(res => {
          this.cptcodes = res;
          var self = this;
          this.cptcodeCss = [];
          this.cptcodes.map( function(cptcode){
            self.cptcodeCss.push(new CptCodeCss(cptcode));
          });
        });
    }
  }

  ngOnInit(): void {
    this.loadCptCodes();
  }

  resetForm() {
    this.addCptCodeForm.reset();
  }

  showHideComment(index) {
    if (this.cptcodeCss[index].commentClass == "") {
      this.cptcodeCss[index].commentClass = "is-visible";
    } else {
      this.cptcodeCss[index].commentClass = "";
    }
  }

  addCptCode() {
    var _comment = this.addCptCodeForm.controls["comment"].value;
    var cptCodeContent = {
      claimId: this.claimId,
      //modifier: this._selectedModifierId,
      modifiers: this.addCptCodeForm.controls['modifiers'].value,
      cptCode: { 
        id: this._selectedCptxId
      },
      comment: _comment == null ? "" : _comment
    };
    this._cptcodeService.addCptCode(cptCodeContent)
        .then(res => {
          if (res.flag) {
            this._toastr.success("CptCode added successfully.");
            this.addCptCodeForm.reset();
            this.loadCptCodes();
          } else {
            this._toastr.error("There was a problem adding CptCode.");
            this.addCptCodeForm.reset();
          }
          this.allowToAdd = false;
        });
  }

  private _sendComment(event, cptcode: CPTCode, index) {
    event.stopPropagation();
    this.cptcodeCss[index].commentClass = "";
    var cptCodeContent = {
      comment: cptcode.comment,
      id: cptcode.id.toString(),
      claimId: this.claimId
    }
    this._cptcodeService.postCptCodeComment(cptCodeContent)
        .then(res => {
          if (res.flag) {
            this._toastr.success("Comment submitted.")
            this.loadCptCodes();
          }
    });
  }

  onKey(event, cptcode: CPTCode, index) {
    if (event.key == "Enter"){
      this._sendComment(event, cptcode, index);
    }
  }

  sendComment(event, cptcode: CPTCode, index) {
    this._sendComment(event, cptcode, index);
  }

  private checkForDuplicate(_cptCode): boolean {
    for (let element of this.cptcodes) {
      if (element.cptCode.cptCode == _cptCode) {
        return true;
      }
    }
    return false;
  }

  searchCptCodeDesc(event) {
    var self = this;
    event.stopPropagation();
    var CPTCODE_SEARCH_URL = localStorage.getItem('baseUrl') + '/search/cptcode/';
    var CPTDESC_SEARCH_URL = localStorage.getItem('baseUrl') + '/search/cptdesc/';
    (<any>$('.ui.search.cptcode'))
            .search({
                apiSettings: {
                    url: CPTCODE_SEARCH_URL,
                    method: 'POST',
                    beforeXHR: function(xhr) {
                      xhr.setRequestHeader('Content-type', 'application/json');
                      return xhr;
                    },
                    beforeSend: (settings) => {
                      settings.data = JSON.stringify({query: event.target.value});
                      return settings
                    }
                },
                fields: {
                    results : 'cptCodeList',
                    title   : 'cptCode',
                    description: 'cptDesc'
                },
                onSelect: function(result, response) {
                  if (self.checkForDuplicate(result.cptCode)) {
                    self._toastr.error("Duplicate CptCode selected.");
                    self.addCptCodeForm.patchValue({cptcode: ""});
                    self.addCptCodeForm.patchValue({comment: ""});
                    self.allowToAdd = false;
                  } else {
                    self.addCptCodeForm.patchValue({cptcode: result.cptCombined});
                    self._selectedCptxId = result.id;
                    self.allowToAdd = true;
                  }
                  return false
                },
                minCharacters : 2
            });
  }
}
