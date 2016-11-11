import { Component, Input, OnInit } from '@angular/core';

import { MemberInfo } from './member-info.model';
import { MemberInfoService } from './member-info.service';

@Component({
    selector: 'member-info',
    templateUrl: './member-info.component.html',
    providers: [MemberInfoService]
})
export class MemberInfoComponent implements OnInit{
    private memberInfo: MemberInfo;
    constructor(private _memberInfoService: MemberInfoService) {
        this.memberInfo = null;
    }

    private loadMemberInfo(): void {
        this._memberInfoService.getMemberInfo()
            .then(res => this.memberInfo = res);
    }

    ngOnInit(): void {
        this.loadMemberInfo();
    }

    nextChart($event) {
        this.loadMemberInfo()
    }
}