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
  private _selectedModifierId = -1;
  private cptcodeCss: Array<CptCodeCss> = [];

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
          this._toastr.success("CptCode added successfully.");
          this.addCptCodeForm.reset();
          this.loadCptCodes();
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

  searchCptCodeDesc(event) {
    var self = this;
    event.stopPropagation();
    (<any>$('.ui.search.cptcode'))
            .search({
                apiSettings: {
                    url: '//localhost:8080/ravnepal/search/cptcode/',
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
                    title   : 'cptCode'
                },
                onSelect: function(result, response) {
                  self.addCptCodeForm.patchValue({cptcode: result.cptCode});
                  self.addCptCodeForm.patchValue({description: result.cptDesc});
                  self._selectedCptxId = result.id;
                },
                minCharacters : 3
            });
    (<any>$('.ui.search.cptdescription'))
            .search({
                apiSettings: {
                    url: '//localhost:8080/ravnepal/search/cptdesc/',
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
                    title   : 'cptDesc'
                },
                onSelect: function(result, response) {
                  self.addCptCodeForm.patchValue({cptcode: result.cptCode});
                  self.addCptCodeForm.patchValue({description: result.cptDesc});
                  self._selectedCptxId = result.id;
                },
                minCharacters : 3
            });
  }

  // (keyup)="searchModifier($event)"
  searchModifier(event) {
    var self = this;
    event.stopPropagation();
    (<any>$('.ui.search.modifiers'))
            .search({
                apiSettings: {
                    url: '//localhost:8080/ravnepal/search/modifier/',
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
                    results : 'modifiers',
                    title   : 'modifier'
                },
                onSelect: function(result, response) {
                  self.addCptCodeForm.patchValue({modifiers: result.modifiers});
                  self._selectedModifierId = result.id;
                },
                minCharacters : 3
            });
  }
}
