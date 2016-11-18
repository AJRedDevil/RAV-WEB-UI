import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { DateLib } from "./dateLibrary"

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

 
@Pipe({
	name : "convertNullToEmptyString"
})
 
export class ConvertNullToEmptyString{
	transform(value){
    if (value == null) return ""
    return value;
	}
}