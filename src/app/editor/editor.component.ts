import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import Quill from 'quill/core';

import Toolbar from 'quill/modules/toolbar';
import Snow from 'quill/themes/snow';

import Bold from 'quill/formats/bold';
import Italic from 'quill/formats/italic';
import Header from 'quill/formats/header';

@Quill.register({
  'modules/toolbar': Toolbar,
  'themes/snow': Snow,
  'formats/bold': Bold,
  'formats/italic': Italic,
  'formats/header': Header
})

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})

export class EditorComponent implements OnInit {

  options = {
    debug: 'info',
    modules: {
      toolbar: '#toolbar'
    },
    placeholder: 'Compose an epic...',
    readOnly: true,
    theme: 'snow'
  };
  editor = new Quill('#editor', this.options);

// container = document.getElementById('editor');
// editor = new Quill(this.container);

  // toolbarOptions=['bold','italic'];
  // quill = new Quill('#editor',{
  //   modules:{
  //     toolbar: this.toolbarOptions
  //   }
  // })


  // @ViewChild('container') containerEl: ElementRef;

  //   private editor: Quill.Quill;

  //   ngAfterViewInit() {
  //       this.editor = new Quill(this.containerEl.nativeElement, {
  //           modules: {
  //               toolbar: [
  //                   [{ header: [1, 2, false] }],
  //                   ['bold', 'italic', 'underline'],
  //                   ['image', 'code-block']
  //               ]
  //           },
  //           placeholder: 'Compose an epic...',
  //           theme: 'snow'
  //       });
  //   }


  constructor() { }

  ngOnInit() {
  }

}
