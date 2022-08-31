import { Subject, Course, Requirements, ModuleRequirements } from "../types";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { makeAutoObservable, observable, action, autorun } from 'mobx';
import { checkModRequirementsMatch, checkGenRequirementsMatch } from "../backend/requirementsChecker";
import { buildRequirements } from "../backend/requirementsBuilder";

export class ApplicationStore {
  public subjects: Subject[];
  public completedCourses: Course[];
  public completedAndUnmatchedCourses: Course[];
  public generalRequirementsMatchedCourses: Course[];
  public requirements: Requirements | null;

  public selectedSubject: Subject; // TODO: Move this to UIStateStore

  public supabaseClient: SupabaseClient;

  constructor() {
    makeAutoObservable(this,
      {
        subjects: observable,
        completedCourses: observable,
        completedAndUnmatchedCourses: observable,
        generalRequirementsMatchedCourses: observable,
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
    this.completedAndUnmatchedCourses = [];
    this.generalRequirementsMatchedCourses = [];
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
    if (this.completedCourses.includes(course) || this.completedAndUnmatchedCourses.includes(course) || this.generalRequirementsMatchedCourses.includes(course)) {
      this.removeCompletedCourse(course);
    } else {
      this.addCompletedCourse(course);
    }
  }

  private addCompletedCourse(course: Course) {
    if (this.requirements !== null) {
      const [newRequirements, matched] = checkModRequirementsMatch(course, this.requirements, "add");
      if (matched) {
        this.completedCourses.push(course);
      } else {
        this.completedAndUnmatchedCourses.push(course);
      }
      this.requirements = newRequirements;
    }
  }

  // TODO: test this method
  private removeCompletedCourse(course: Course) {
    if (this.requirements !== null) {
      if (this.completedCourses.includes(course)) {
        this.completedCourses.splice(this.completedCourses.indexOf(course), 1);
        const [newRequirements, matched] =  checkModRequirementsMatch(course, this.requirements, "remove");
        if (matched) { // TODO: is this a redundant check due to the .includes check?
          this.requirements = newRequirements;
        }
      } else if (this.completedAndUnmatchedCourses.includes(course)) {
        this.completedAndUnmatchedCourses.splice(this.completedAndUnmatchedCourses.indexOf(course), 1);
        const [newRequirements, matched] =  checkModRequirementsMatch(course, this.requirements, "remove");
        if (matched) { // TODO: is this a redundant check due to the .includes check?
          this.requirements = newRequirements;
        }
      } else if (this.generalRequirementsMatchedCourses.includes(course)) {
        this.generalRequirementsMatchedCourses.splice(this.generalRequirementsMatchedCourses.indexOf(course), 1);
        const [newRequirements, matched] = checkGenRequirementsMatch(course, this.requirements, "remove");
        if (matched) { // TODO: is this a redundant check due to the .includes check?
          this.requirements = newRequirements;
        }
      }
    }
  }

  // onSubmit, check all courses that haven't been matched, against GeneralRequirements
  public submitCoursesForCheck() {
    if (this.requirements !== null) {
      for (let course of this.completedAndUnmatchedCourses) {
        const [newRequirements, matched] = checkGenRequirementsMatch(course, this.requirements, "add"); 
        if (matched) {
          this.generalRequirementsMatchedCourses.push(course);
          this.completedAndUnmatchedCourses.splice(this.completedAndUnmatchedCourses.indexOf(course), 1);
          this.requirements = newRequirements;
        }
      }
    }
  }

  public initRequirements(moduleRequirements: ModuleRequirements) {
    this.requirements = buildRequirements(moduleRequirements);
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