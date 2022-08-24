import { Subject, Course } from "../types";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { makeAutoObservable, observable, action, autorun } from 'mobx';

export class ApplicationStore {
  public subjects: Subject[];
  public completedCourses: Course[];

  public selectedSubject: Subject | undefined;

  public supabaseClient: SupabaseClient;

  constructor() {
    makeAutoObservable(this,
      {
        subjects: observable,
        completedCourses: observable,
        addCompletedCourse: action,
        removeCompletedCourse: action,
        setSelectedSubject: action
      });
    this.supabaseClient = this.initSupabase();
    this.subjects = [];
    this.completedCourses = [];
    this.initSubjects();
    this.selectedSubject = undefined
  }

  public addCompletedCourse(course: Course) {
    this.completedCourses.push(course);
  }

  // TODO: test this method
  public removeCompletedCourse(course: Course) {
    this.completedCourses.splice(this.completedCourses.indexOf(course), 1);
  }

  public setSelectedSubject(subject: Subject) {
    this.selectedSubject = subject;
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
    console.log(subjects);
    if (subjects) {
      for (let subject of subjects) {
        this.subjects.push(subject);
      }
    }
  }
}