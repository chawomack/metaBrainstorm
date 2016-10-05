import {Component, Compiler, ViewContainerRef, OnInit, NgModule, forwardRef, Input} from '@angular/core';
import * as mock from './mock.data';
import {componentFunctions} from './services';
import {FactoryModule} from  './factory.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
/*
 Compiler contains parser to build modules and components dynamically.
 ViewContainerRef attach/detach views to current component. Default: appends to end of template
 */


/* Takes JSON and returns module and creates all components then passes to module */
function generateComponentsThenModule(JSON) {
  return moduleFactory(JSON.components.map(comp => classFactory(comp)))
}

/* MODULE Factory */
function moduleFactory(component) {
  @NgModule({
    declarations: [...component],
    exports: [],
    providers: [],
    imports: [FormsModule, ReactiveFormsModule]
  })

  class moduleFactoryClass {
  }

  return moduleFactoryClass;
}

/* COMPONENT class Factory */
function classFactory(JSON) {
  @Component({
    'selector': JSON.selector,
    'template': JSON.template,
    'providers': [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => componentClass),
      multi: true
    }]
  })

  class componentClass implements ControlValueAccessor {
    @Input('data') data: any;
    form: FormGroup;

    constructor(private formBuilder: FormBuilder) {
      // binds variables to component class
      for (let key in JSON.variables) {
        this[key] = JSON.variables[key]
      }

      if (JSON.viewId) {
        let children = {};
        JSON.children.forEach(function (name) {
          children[name] = new FormControl()
        });
        this.form = this.formBuilder.group(children);
        this.form.valueChanges.subscribe(data => console.log(data));
      }

    }

    propogateChange(value: any) {
      return value;
    }
    onChange(value: any) { }
    writeValue() { }

    /* Called by valueAccessor NEVER GETS CALLED BY COMPONENT ONLY BY SERVICE */
    registerOnChange(fn: any) {
      this.propogateChange = fn;
    }

    registerOnTouched() {
    }
  }
  // binds the needed functions to component class
  JSON.functions.forEach(function (name) {
    componentClass.prototype[name] = componentFunctions[name];
  });

  return componentClass
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(private compiler: Compiler, private viewContainer: ViewContainerRef) {
  }

  ngOnInit() {
    this.compiler.compileModuleAndAllComponentsAsync(generateComponentsThenModule(mock.data)).then(data => {
      this.viewContainer.createComponent(data.componentFactories[0]);
      /*
       compileModuleAndAllComponentsAsync(module) looks at exports/imports and creates module based on that
       - Gives us module and factories
       ViewContainerRef - createComponent
       -  creates Component from things module/factory generated from compileModuleAndAllComponentsAsync
       We have to create a ngModule when creatingComponent to handle dependencies
       */
    });

  }
}
