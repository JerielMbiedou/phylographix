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
