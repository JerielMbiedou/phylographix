### Summary
<!-- Summarize the bug encountered concisely -->


### Steps to reproduce
<!-- How one can reproduce the issue - this is very important -->

### What is the current bug behavior?
<!-- What actually happens -->


### What is the expected correct behavior?
<!-- What you should see instead -->


### Relevant logs and/or screenshots
<!-- Paste any relevant logs - please use code blocks (```) to format console output,
logs, and code as it's very hard to read otherwise. -->


### Possible fixes
<!-- If you can, link to the line of code that might be responsible for the problem -->

/label ~Bug
<details>

<summary>Process steps</summary>

<details>

<summary>Convert to To-Do</summary>


### Summary
<!-- Summarize the to-do concisely -->

### Next Steps
<!-- List steps/subtask to be done -->
- [ ] Step 1
- [ ] Step 2

<!-- fill out metadata -->
/milestone %
/label ~Prio
/due this week
/estimate 8h
/assign @

/label ~"To Do" 

<details>

<summary>Process Steps</summary>

<details>

<summary>Start Work</summary>

```
<!-- Create merge request and branch using the button in GitLab -->
/label ~Doing
```

</details>

<details>

<summary>Ready to Review</summary>

```
### Ready to Review
<!-- Explain results and where to find them -->

<!-- put time spend on the task -->
/spend 

<!-- Explane big deviations between planned and spend effort -->
 
<!-- assign reviewer -->
/assign @
<!-- put original assignee in cc -->
/cc @ 

/unlabel ~"Doing"
/label ~"To Review"
```
</details>

<details>

<summary>Closing Declined</summary>

```
### Closing Declined
<!-- Explain why -->

<!-- put time spend on reviewing -->
/spend 

<!-- assign back to original assignee (see who is in CC) -->
/assign @
<!-- put the reviewer (i.e. yourself) in CC -->
/cc @

/unlabel ~"To Review"
/label ~"To Do"
```
</details>

<details>

<summary>Ready to Merge</summary>

```
### Ready to Merge
<!-- Put comment if needed -->

<!-- put time spend on reviewing -->
/spend 

<!-- Explane big deviations between planned and spend effort -->
 
<!-- assign back to original assignee (see who is in CC) -->
/assign @
<!-- put the reviewer (i.e. yourself) in CC -->
/cc @

/unlabel ~"To Review"
/label ~"To Merge"
```
</details>


<details>

<summary>Closing</summary>

```
### Closed
<!-- Explain end result or why is closed -->

<!-- put time spend on the task -->
/spend 

/unlabel ~"To Do"
/unlabel ~"Doing"
/unlabel ~"To Review"
/unlabel ~"To Merge"
/done 
/close 
```
</details>

</details>

</details>
<details>

<summary>Reject</summary>

```
### Rejected
<!-- Explain why -->

<!-- put time spend on the task -->
/spend 

/done 
/close 
```
</details>

</details>

