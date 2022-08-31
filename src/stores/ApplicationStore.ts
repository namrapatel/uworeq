import { Subject, Course, Requirements } from "../types";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { makeAutoObservable, observable, action, autorun } from 'mobx';

export class ApplicationStore {
  public subjects: Subject[];
  public completedCourses: Course[];
  public requirements: Requirements | null;

  public selectedSubject: Subject; // TODO: Move this to UIStateStore

  public supabaseClient: SupabaseClient;

  constructor() {
    makeAutoObservable(this,
      {
        subjects: observable,
        completedCourses: observable,
        requirements: observable,
        selectedSubject: observable,
        supabaseClient: observable,
        setSelectedSubject: action,
        handleCourseAdditionOrRemoval: action,
      });

    this.supabaseClient = this.initSupabase();
    this.subjects = [];
    this.requirements = null;
    this.completedCourses = [];
    this.initSubjects();
    // Dummy subject
    this.selectedSubject = {
      name: 'All subjects',
      courses: [],
      category: '',
      url: ''
    };
  }

  public handleCourseAdditionOrRemoval(course: Course) {
    if (this.completedCourses.includes(course)) {
      this.removeCompletedCourse(course);
    } else {
      this.addCompletedCourse(course);
    }
  }

  private addCompletedCourse(course: Course) {
    this.completedCourses.push(course);
  }

  // TODO: test this method
  private removeCompletedCourse(course: Course) {
    this.completedCourses.splice(this.completedCourses.indexOf(course), 1);
  }

  public setRequirements(requirements: Requirements) {
    this.requirements = requirements;
  }

  public setSelectedSubject(subject: Subject) {
    this.selectedSubject = subject;
    console.log("Selected subject is: "+this.selectedSubject.name);
  }

  private initSupabase() {
      const supabaseUrl = 'https://uzimejpydlbynjhxkinq.supabase.co';
      const supabaseKey: string = import.meta.env.VITE_SUPABASE_KEY;
      return createClient(supabaseUrl, supabaseKey)
  }

  public async initSubjects() {
    let { data: subjects, error } = await this.supabaseClient
      .from('subjects')
      .select('*')

    if (subjects) {
      for (let subject of subjects) {
        this.subjects.push(subject);
      }
    }
  }
}