# script to add the global questions to the database
from PxPUC.models import *

def run():
    # category ids
    precomplaint = Category.objects.get(category="Pre-Complaint").id
    complaint = Category.objects.get(category="Complaint").id
    review = Category.objects.get(category="Review").id
    investigation = Category.objects.get(category="Investigation").id
    result = Category.objects.get(category="Result").id
    # Global questions
    questions = [
            {
                "q": "What is Police Misconduct?",
                "a": "The California Innocence Project defines police misconduct as illegal or unethical actions or the violation of individuals constitutional rights by police officers in the conduct of their duties.",
                "c": precomplaint
                },
            {
                "q": "How do i know if I've experienced police misconduct?",
                "a": "Police misconduct happens when inappropriate/illegal actions are taken by police officers in connection to their work. Some common examples of police misconduct are: intimidation, false arrest, false imprisonment, falsification of evidence, witness tampering, police brutality, police corruption, racial profiling, unwarranted searches. If you think you experienced misconduct you can file a complaint with the police department. NOTE: If you are considering filing a lawsuit you should speak to a lawyer before making a complaint. A lawyer will help you decide your next step.",
                "c": precomplaint
                },
            {
                "q": "What are some examples of misconduct?",
                "a": "Some common examples of police misconduct are: intimidation, being arrested or imprisoned for the wrong reason, making up evidence, restricting witnesses, police brutality, police dishonesty, treating people poorly because of their race, searches with no permission, or failing to help when they are asked.",
                "c": precomplaint
                },
            {
                "q": "What resources are there if I have questions before filing a report or I want to talk about legal representation?",
                "a": "Many cities have local organizations across the country working to increase police accountability, these will be often be the most helpful resource. Also, your local chapter of the ACLU can be helpful. You can find that through the ACLU website.",
                "c": precomplaint
                },
            {
                "q": "What are the risks of filing a police misconduct complaint?",
                "a": "In some police departments, the accused officer is allowed to see the name of the person who filed the complaint. You can check your local contract on this webiste to find out! If you are worried that an officer might try to fight back against you for filing the complaint, it may be the best option not to file at this time and think about talking to a lawyer. The community orginizations in your city might be able to help you find someone to talk to.",
                "c": precomplaint
                },
            {
                "q": "Who can file a complaint?",
                "a": "The victim of misconduct should file the complaint for themselves if possible. Some police departments do not accept misconduct complaints from witnesses to misconduct and will only accept complaints from victims. If you are a witness to misconduct and would like to file a complaint, check with the police department or police oversight board first to find out if it will be accepted. If the victim of misconduct is under 18 years old, a parent or guardian can file the complaint on their behalf.",
                "c": complaint
                },
            {
                "q": "What information do I need to file a complaint?",
                "a": "The more information the better! The most useful detail is the officers name and/or badge number, but you can still file a complaint without that information. Write down everything you can remember about the incident before you start filling out the form. Try to recall as much detail as possible: when did it happen? where? did anyone else see? what did the officer look like? what did their car look like?, etc. Be aware that complaints may be dismissed if there is not enough information to identify the accused officer.",
                "c": complaint
                },
            {
                "q": "Do I have to file the complaint within a certain period of time?",
                "a": "Many municipalities require the victim to file within 6 months of the misconduct. Check with the police department or, if possible, a police oversight board.",
                "c": complaint
                },
            {
                "q": "How do I file a complaint?",
                "a": "All departments allow complaints to be filled in person or by phone. Many also have online forms, mail in or even fax options as well. If you need assistance filing, you can ask the police department or municipal government for assistance; however, responses could vary wildly. Some departments might be very helpful, others might want to discourage people from filing.",
                "c": complaint
                },
            {
                "q": "How long does the review process take?",
                "a": "The length of time varies by police department. It can take as little as 30 days to 6 months depending on how serious the problem is. According to NACOLE, the general time limit is 180 days.",
                "c": review
                },
            {
                "q": "What are the risks of filing a police misconduct complaint?",
                "a": "In some police departments, the accused officer is allowed to see the name of the person who filed the complaint. [mention we can check this w tool.] If you are concerned that an officer might try to retaliate against you for filing the complaint, it may be the best option not to file at this time.",
                "c": investigation
                },
            {
                "q": "What happens after I file a complaint?",
                "a": "explain general process (flow chart)",
                "c": investigation
                },
            {
                "q": "Will my name be kept anonymous?",
                "a": "It again varies by department. Some allow anonymous or third party complaints, some do not. Most complaint forms will require some form of contact information.",
                "c": investigation
                },
            {
                "q": "What are some possible results?",
                "a": "Dismissed/Not Sustained: the department didn&rsquo;t feel there was enough information to make a decision.  Exonerated: the department decided there either was no misconduct or the way the officer acted was allowed.  Sustaied: the evidence in the complaint proved there was misconduct. They decide what happens to the officer.",
                "c": result
                },
            ]

    for question in questions:
        q, was_created = Question.objects.get_or_create(q=question["q"], a=question["a"])
        q.save()
        q.category.set([question["c"]])
        q.save()

