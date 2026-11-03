# ProjectHive

## Problem
Students working in groups have a hard time communicating and organizing their work, which can result in bad teamwork, missed deadlines, and lower project scores.

## Users and roles
Project leader: a person who creates a project and invites others to collaborate. The leader manages milestones, tasks, and deadlines.
Team member: a person who accepts an invitation and joins a project. Members update the status of tasks assigned to them.
Roles belong to a project, not to a user. The same person can be the leader of one project and a member of another.

## User stories
1. Register and Log In
As a user, I want to create an account and log in so that I can access my projects securely.
Accepted when:
- A new user can register with a name, email, and password.
- A registered user can log in and log out.
- Passwords are stored as hashes, never as plain text.
- Project pages and actions are only available to logged in users.

2. Create a Project with Scope and Timeline
As a project leader, I want to create a project and define its scope and timeline so that the team understands what needs to be accomplished and when.
Accepted when:
- A logged in user can create a project and becomes its leader.
- The project leader can define the project description and scope.
- The project leader can set and edit the project start date and end date.
- Team members can view the project scope and timeline.

3. Invite Users and Respond to Invitations
As a project leader, I want to invite people to my project, and as a team member, I want to accept or reject invitations so that I can choose which projects I join.
Accepted when:
- The project leader can search for registered users and send an invitation.
- The invited user can view their pending invitations.
- The invited user can accept an invitation and become a member of the project.
- The invited user can reject an invitation.
- A user who is already a member, or who already has a pending invitation, cannot be invited again.

4. Create Milestones
As a project leader, I want to create milestones within a project so that I can divide the project into manageable stages.
Accepted when:
- The project leader can create a milestone.
- A milestone has a name and description.
- A milestone has a start date and end date.
- Tasks can be placed in a specific milestone.

5. Create and Assign Tasks with Deadlines
As a project leader, I want to create tasks, assign them to team members, and set deadlines so that each member knows what they are responsible for and when it is due.
Accepted when:
- The project leader can create a task inside a milestone.
- The project leader can assign the task to a project member.
- The project leader can set and edit the task deadline.
- The project leader can change the assigned member before the task is completed.
- Team members can view the task deadline.
- Overdue tasks are clearly indicated.

6. View My Tasks and Update Status
As a team member, I want to view and organize my assigned tasks and update their status so that I can manage my time and the leader can see where things stand.
Accepted when:
- The team member can view all tasks assigned to them.
- Tasks display their status and deadline.
- The team member can filter tasks by milestone or status.
- Tasks can be sorted by deadline.
- The team member can change the status of an assigned task between pending, in progress, and complete.
- Completed tasks are clearly identified.

7. Leader Overview
As a project leader, I want one page that shows the state of my project so that I can quickly spot delays and problems.
Accepted when:
- The page lists overdue tasks.
- The page shows the progress of each milestone, based on completed tasks compared to total tasks.
- The page shows the tasks assigned to each member.
- The page is read only. It does not add any new actions.

## MVP scope
Must have: stories 1 to 6 (register and log in, create a project with scope and timeline, invitations, milestones, create and assign tasks with deadlines, view my tasks and update status).
Nice to have: story 7 (leader overview).

## Entities
| Entity | Main attributes | Relations |
|---|---|---|
| User | user_id, name, email, password, is_admin | can create projects, be a member of many projects, and be invited to projects |
| Project | project_id, name, description, scope, start_date, end_date, created_by | has many members and many milestones |
| ProjectMember | project_member_id, project_id, user_id, role, status, joined_at | connects users to projects (invitations have pending status) |
| Milestone | milestone_id, project_id, name, description, start_date, end_date | belongs to a project and has many tasks |
| Task | task_id, milestone_id, title, description, deadline, status, assigned_to | belongs to a milestone and is assigned to one project member |

## Stretch feature
File Upload
Team members can upload files related to their project, such as documents, presentation slides, images, and other assignment materials. Other members of the same project can view and download these files.
Attachment: attachment_id, project_id, uploaded_by, file_name, file_path, uploaded_at.

## Explanations
**Which story did you cut from the MVP, and why?**
I cut Schedule Meetings and Select Meeting Availability because meeting scheduling is secondary to task tracking. I also cut explicit member task acceptance/rejection since tasks are pre-coordinated in team meetings; members simply track and update the status of assigned tasks directly.
**Repository**
https://github.com/chhengkimteralt/ProjectHive