import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {IPerson} from "../interfaces/person.interface.ts";
import {persons} from "../../shared/datas/persons";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor() { }

  getPersons(): Observable<IPerson[]> {
    return of(persons);
  }




getPerson(id: string| number): Observable<IPerson | undefined> {
    return of(persons.find(person => person.id === id));
  }

}
