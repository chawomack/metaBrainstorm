export var data = {
  components: [
    {
      viewId: 'root-view',
      selector: 'parent',
      template: `
            <form [formGroup]="form">
                <my-data [data]="'How Do You Want to Start?'"></my-data>
                <my-radio [data]="{checked: true, label: 'upload resume'}" (change)="toggle()"></my-radio>
                <my-radio [data]="{checked: false, label: 'enter skill'}" (change)="toggle()"></my-radio>
                
                <my-input [hidden]="selectedSkill" 
                          formControlName="input" 
                          (change)="onChange($event.target.value)" #inputValue></my-input>
                <my-button (click)="continue()"></my-button>
                <my-data [data]="skill"></my-data>
            </form>`,
      functions: ['toggle', 'continue', 'onChange'],
      variables: {
        selectedSkill: true,
        inputValue: '',
        skill: ''
      },
      children: ['input']
    },
    {
      selector: 'my-button',
      template: `<button>Continue</button>`,
      functions: []
    },
    {
      selector: 'my-input',
      template: '<label>{{label}}</label><input type="text">',
      functions: [],
      variables: {
        label: 'Skills'
      }
    },
    {
      selector: 'my-data',
      template: '<p>{{data}}</p>',
      functions: []
    },
    {
      selector: 'my-radio',
      template: `
            <label>{{data.label}}</label>
            <input type="radio" name={{name}} [attr.checked]="data.checked ? true : null"/>
       `,
      variables: {
        name: 'first-action',
        radioLabels: ['upload resume','enter skills']
      },
      functions: ['selectRadio']
    }
  ]
};


/*
{
  parentId: 'loginView',
  parentId: 'loginView',
  selector: 'login',
  template: '',
  css: [],
  functions: [],
  variables: {},
  components: [
      // GENERIC VDL Object
      {
        selector: 'vdl-component-name'
        template: '<vdl-component></vdl-component>',
        variables: {},   // local to component
        functions: [],   // local to component
        bindings: {
          click: 'clickMe()',
          change: 'changeFnc()'
        }
      }
  ]
  layout: {
    row: {
      col-md-4: [componentId1, componentId2, componentId3],
      col-md-4: {
        col-md-6: [componentId4],
        col-md-6: [componentId5]
      }
    }
  }
}


{
  id: 'button',
  events: {click: 'onClick()', change: 'onChange()'},
  directives: {hidden: 'isToggled'}
}
 */
