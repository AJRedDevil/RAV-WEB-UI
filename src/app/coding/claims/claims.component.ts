import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Claim } from '../claim/claim.model';
import { ClaimsService } from './claims.service';
import { DateValidators } from '../../shared/dateValidators';
import { DateLib } from '../../shared/dateLibrary';
import { Utility } from '../../shared/utility';

@Component({
    selector: 'claims',
    templateUrl: './claims.component.html',
    providers: [ClaimsService]
})
export class ClaimsComponent implements OnInit {
    private claims: Claim[] = [];
    private addClaimForm: FormGroup;
    private dosFormClass = "";
    private _selectedProviderId: number;
    private _selectedProvider = "";
    private today_date: Date;
    private isChartComplete: boolean;
    private codingCompleteModal: boolean;
    private saveForLaterModal: boolean;
    private nextChartModal: boolean;
    private modalOptions: any;
    private activeLoader: boolean;
    private loaderText = "Loading";
    private loaderSize = "mini";
    private yearRange: string;
    private accordOption: any;
    @Output('getNextChart') nextChart = new EventEmitter();

    constructor(
        private _claimService: ClaimsService,
        private _fb: FormBuilder,
        private _toastr: ToastsManager) {
            this.addClaimForm = this._fb.group({
                dateOfService: ['', Validators.required],
                provider: ['']
            });
            this._selectedProviderId = -1;
            this.today_date = new Date();
            this.isChartComplete = false;
            this.codingCompleteModal = false;
            this.saveForLaterModal = false;
            this.activeLoader = true;
            this.accordOption = {
                "styled": true,
                "fluid": true,
                "inverted": false,
                "allowMultiple": false
            }
    }

    private loadClaims(): void {
        this._claimService.getClaims()
            .then(res => {
                this.claims = res;
                var activeFound = false;
                this.claims.forEach(element => {
                    if (!element.reviewed && !activeFound) {
                        element.active = true;
                        activeFound = true;
                    } else {
                        element.active = false;
                    }
                });
                this.activeLoader = false;
            });
    }

    ngOnInit() {
        this.loadClaims();
        var self = this;
        var PROVIDER_SEARCH_URL = localStorage.getItem('baseUrl') + '/search/provider/';
        (<any>$('.ui.button')).popup({
                                    hoverable  : false,
                                    position   : 'bottom right',
                                    lastResort   : 'bottom right',
                                    on    : 'click'
        });
        (<any>$('.ui.search'))
            .search({
                apiSettings: {
                    url: PROVIDER_SEARCH_URL,
                    method: 'POST',
                    beforeXHR: function(xhr) {
                        xhr.setRequestHeader('Content-type', 'application/json');
                        return xhr;
                    },
                    beforeSend: (settings) => {
                        settings.data = JSON.stringify({query: $('.ui.search input').val()});
                        return settings
                    }
                },
                fields: {
                    results : 'providerList',
                    title   : 'fullName'
                },
                onSelect: function(result, response) {
                    self.addClaimForm.patchValue({provider: result.fullName});
                    self._selectedProviderId = result.id;
                    self._selectedProvider = result.fullName;
                },
                minCharacters : 3
            });
        this.modalOptions = {
            "size": "small",
            "type": "default",
            "closeable": true
        }
        this.yearRange = "1990:" + this.today_date.getFullYear();
    }

    private resetForm() {
        this.addClaimForm.reset();
    }

    checkProvider() {
        if (this._selectedProviderId < 0) {
            this.addClaimForm.controls['provider'].setErrors({
                selectProvider: true
            })
        }
    }

    addClaim() {
        // if (this.addClaimForm.controls['dateOfService'].value == "") {
        //     this.addClaimForm.controls['dateOfService'].setErrors({
        //         required: true
        //     })
        // }
        // else if (this._selectedProviderId < 0 || this._selectedProvider == "" || (this._selectedProvider != this.addClaimForm.controls['provider'].value)) {
        //     this.addClaimForm.controls['provider'].setErrors({
        //         selectProvider: true
        //     })
        // } else {
        var claimContent = this.addClaimForm.value;
        claimContent["reviewed"] = false;
        claimContent["comment"] = "";
        claimContent["chartId"] = parseInt(localStorage.getItem("chartId"));
        claimContent["provider"] = {
            "id": this._selectedProviderId
        };
        claimContent["dateOfService"] = DateLib.convertTommddyyyy(this.addClaimForm.controls['dateOfService'].value);
        this._claimService.addClaim(claimContent)
            .then(res => {
                (<any>$('.ui.button')).popup('hide');
                this.resetForm();
                this._toastr.success("Claim added succesfully!!", null);
                // {
                //     "closeButton": false,
                //     "debug": false,
                //     "newestOnTop": false,
                //     "progressBar": false,
                //     "positionClass": "toast-bottom-right",
                //     "preventDuplicates": false,
                //     "onclick": null,
                //     "showDuration": "300",
                //     "hideDuration": "1000",
                //     "timeOut": "5000",
                //     "extendedTimeOut": "1000",
                //     "showEasing": "swing",
                //     "hideEasing": "linear",
                //     "showMethod": "fadeIn",
                //     "hideMethod": "fadeOut"
                // });
                this.loadClaims();
            });
    }
    
    private _getNextChart(reload: boolean) {
        this._claimService.goToNextChart()
            .then(res => {
                if (res.flag) {
                    this.isChartComplete = false;
                    if (reload) {
                        this.nextChart.emit({ "nextChart": false });
                    }
                    this.loadClaims();
                }
            });
    }

    showCodingCompeleteModal() {
        this.codingCompleteModal = true;
    }

    codingCompeleteCancel() {
        this.codingCompleteModal = false;
    }

    codingComplete(event, reload) {
        event.stopPropagation();
        this.isChartComplete = true;
        this._claimService.codingComplete()
            .then(res => {
                if (res.flag) {
                    this.isChartComplete = true;
                    this._toastr.success("Coding Complete.");
                    if (reload) {
                        this.goToNextChart(true);
                    }
                }
            });
    }

    showSaveForLaterModal() {
        this.saveForLaterModal = true;
    }

    saveForLaterCancel() {
        this.saveForLaterModal = false;
    }

    saveForLater(event, nextChart) {
        event.stopPropagation();
        this._claimService.saveForLater()
            .then(res => {
                if (res.flag) {
                    this._toastr.success("Saved For Later.")
                    if (nextChart) {
                        this.goToNextChart(true);
                    }
                }
            });
    }

    goToNextChart(event) {
        this._getNextChart(true);
    }

    registerNext(e) {
        this._getNextChart(false);
    }

    reloadClaims(event) {
        this.loadClaims();
    }

    activeModal(): void {
        if (this.isChartComplete)
            this.goToNextChart(true);
        else
            this.nextChartModal = true;
    }

    cancelNextChartModal(): void {
        this.nextChartModal = false;
    }
}
