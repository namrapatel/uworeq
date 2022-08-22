import { Subject, Course } from "../types";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { makeAutoObservable, observable, action, autorun } from 'mobx';

require('dotenv').config({ path: '../.env' })

export class ApplicationStore {
  public subjects: Subject[];
  public completedCourses: Course[];

  public supabaseClient: SupabaseClient;

  constructor() {
    makeAutoObservable(this,
      {
        subjects: observable,
        completedCourses: observable,
        addCompletedCourse: action,
        removeCompletedCourse: action
      });
    this.supabaseClient = this.initSupabase();
    this.subjects = [];
    this.completedCourses = [];
  }

  public addCompletedCourse(course: Course) {
    this.completedCourses.push(course);
  }

  // TODO: test this method
  public removeCompletedCourse(course: Course) {
    this.completedCourses.splice(this.completedCourses.indexOf(course), 1);
  }

  private initSupabase() {
      const supabaseUrl = 'https://uzimejpydlbynjhxkinq.supabase.co';
      var supabaseKey: string = "";
      if (process.env.SUPABASE_KEY) {
          supabaseKey = process.env.SUPABASE_KEY
      }
      return createClient(supabaseUrl, supabaseKey)
  }

  private async initSubjects() {
    let { data: subjects, error } = await this.supabaseClient
      .from('subjects')
      .select('*')
    console.log(subjects);

    return subjects;
  }

}