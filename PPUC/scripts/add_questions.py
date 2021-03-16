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
                "a": "The <a target='_blank' href='https://californiainnocenceproject.org/issues-we-face/police-misconduct/#:~:text=Police%20misconduct%20encompasses%20illegal%20or,the%20conduct%20of%20their%20duties.'>California Innocence Project</a> defines police misconduct as \"illegal or unethical actions or the violation of individuals' constitutional rights by police officers in the conduct of their duties\". It is important to know your constitutional rights so you are prepared before any interactions with the police. You have the right to remain silent, but you must say you want to excerise the right. You have the right to not be searched without a warrant. If you are not being arrested, you have the right to calmy leave. If you are arrested, you have the right to a lawyer and you should ask for one  immediately. More information can be found <a target='_blank' href='https://www.naacp.org/wp-content/uploads/2016/04/Racial_Profiling_Know_Your_Rights_Supplement_6-12-12.pdf'>here</a>.",
                "c": precomplaint
                },
            {
                "q": "What are some examples of misconduct?",
                "a": "Police misconduct can take a wide variety of forms. Misconduct includes failure to investigate a crime; racial discrimination; sexual assault or harrassment; using excessive force; false imprisonment; falsifying evidence; and searching a person without probable cause.",
                "c": precomplaint
                },
            {
                "q": "What are the risks of filing a police misconduct complaint?",
                "a": "In Pittsburgh, there is the possibility that your complaint will not be anonymous and could be shared with police staff. If you are worried that an officer might try to fight back against you for filing the complaint, it may be the best option not to file at this time and think about talking to a lawyer. The community orginizations listed in the previous question might be able to help you find someone to talk to.<br/>It may be the best option not to file at this time and talk to a lawyer or the community organizations listed in the previous question.",
                "c": precomplaint
                },
            {
                "q": "What if my interaction was with a police officer who is not part of the Pittsburgh Burea of Police?",
                "a": "Each police department is different, so the processes for filing complaints varies from one department to the next. These answers are specific to the city of Pittsburgh and may not apply to other municipalities. We hope to be able to provide FAQs for other municipalities in Allegheny County eventually, but in the meantime you will likely need to speak to the police department or the municipal government it serves to learn about its complaint process.",
                "c": precomplaint
                },
            {
                "q": "Who can file a complaint?",
                "a": "The victim of misconduct should file the complaint for themselves if possible. If you are a witness to misconduct and would like to file a complaint, you are able to with either CPRB or OMI but you will need the name of the victim. If the victim of misconduct is under 18 years old, a parent or guardian can file the complaint for them. You are able to file a complaint with OMI annoymously but the evidence must be able to be verified.",
                "c": complaint
                },
            {
                "q": "What information do I need to file a complaint?",
                "a": "The more information the better! The most useful detail is the date of the incident, the officer's name and/or badge number, the details of the event, and your contact information so you can be updated on your investigation. But you can still file a complaint without all that information. Write down everything you can remember about the incident before you start filling out the form. Try to recall as much detail as possible: when did it happen? where? did anyone else see? what did the officer look like? what did their car look like?, etc. Be aware that complaints may be dismissed if there is not enough information to identify the accused officer.<br/>Also note that Pittsburgh police officers can only be considered for discipline if it is shown they broke an official police policy (those policies can be found <a target='_blank' target='_blank' href='https://pittsburghpa.gov/police/manual-procedural-orders'>here</a>). For example, it is a violation of policy to fire a \"warning shot\" according to the \"Discharge of Firearms and Less-Lethal Weapons\" policy (12-07-4.2). It could be helpful to your case to state which specific policy you believe the officer violated.",
                "c": complaint
                },
            {
                "q": "Do I have to file the complaint within a certain period of time?",
                "a": "OMI requires complaints to be made within 90 days of the incident. CPRB does not state a time limit but it is smart to stick within 90 days. The sooner you can file a complaint, the better.",
                "c": complaint
                },
            {
                "q": "Should I get a lawyer?",
                "a": "If you feel more comfortable, it could be a good idea to work with a lawyer. ACLU Pittsburgh might be able to assist you if you are unable to find legal services on your own. Each complaint is unique and specific, so contacting community experts or experienced lawers can be helpful in gathering your information for a complaint.",
                "c": complaint
                },
            {
                "q": "Should I file my complaint with the OMI or with the CPRB? Can I file with both?",
                "a": "Yes, you can file a complaint with both agencies if you would like. Each method has pros and cons. The OMI is an office within the Pittsburgh city government, so it is not an independent entity and investigations could potentially be affected by conflicts of interest. The CPRB is an independent entity so it may be more likely to investigate complaints thoroughly. However, only the OMI has the authority to discipline police officers. The CPRB can recommend disciplinary action but cannot enforce it if the Burea of Police chooses to dismiss the recommendation.",
                "c": complaint
                },
            {
                "q": "How long does the review process take?",
                "a": "The length of time varies by which group you file a complaint with.",
                "c": review
                },
            {
                "q": "Can either group deny reviewing my complaint?",
                "a": "The board of CPRB has the right to choose not to investigate a complaint but they have never denied to consider any formally filed complaint. OMI must consider all properly filed complaints.",
                "c": review
                },
            {
                "q": "Can I choose who investigates my case?",
                "a": "No, that is assigned internally by the office staff. ",
                "c": investigation
                },
            {
                "q": "Will my name be kept anonymous?",
                "a": "For CPRB, you cannot file a formal complaint anonymously because a sworn statement is required. However, your information is kept confidential unless it makes it to a public hearing.<br/>OMI allows people to file anonymously but the evidence has to be verified and the officer will be asked about the details of the event in question. If you file a complaint with them anonymously, they may feel they don't have enough evidence and are more likely to dismiss the complaint. Also, all city employees have the right to see complaints made against them. So, if you file anonymously, your complaint is less likely to be investigated and the officer is within their rights to view the complaint. Therefore, complete anonymity is not probable.",
                "c": investigation
                },
            {
                "q": "How do I know what stage my complaint is at?",
                "a": "CPRB will notify both you and the officer within 15 days if your complaint moves to the next step in the process or if it is dismissed at any point prior to a public hearing. If you do not recieve this notification, you should contact CPRB directly or the investigator assigned to your complaint.<br/>OMI has less steps to the process so the review and investigation are lumped into the same time frame. Your complaint may be under investigation for a long period of time. Once a decision is made, you will be notified no matter what.",
                "c": investigation
                },
            {
                "q": "What are some possible results?",
                "a": "<span class='font-weight-bold'>Dismissed/Not Sustained:</span> the investigator didn't feel there was enough information to make a decision.<br/><span class='font-weight-bold'>Exonerated:</span> the investigator decided there either was no misconduct or the way the officer acted was allowed.<br/><span class='font-weight-bold'>Sustained:</span> the evidence in the complaint proved there was misconduct. OMI or CPRB present their findings to city leadership including the police chief and they decide what happens to the officer. CPRB cannot enforce any discipline, they are able to recommend a good course of action but it is up to the police buerau in the end. OMI does have the power to enforce discipline, but the officer can appeal.",
                "c": result
                },
            {
                "q": "What are some possible forms of discipline?",
                "a": "The most common forms of discipline are coaching, oral reprimand, written reprimand, and suspension. In rare case the officer may be terminated. Generally, you will not be told what form of discipline has been approved.",
                "c": result
                },
            {
                "q": "Am I notified about the decision of my complaint?",
                "a": "Yes. Both OMI and CPRB will notify you in writing what the final decision is for your complaint. Both you and the officer in question will always be notified in writing of the final decision. Unlike OMI, there are several points in the CPRB investigation process where a complaint can be dismissed because a complaint goes through so many steps. So even if your complaint makes it all the way to a public hearing, it can still be dismissed.",
                "c": result
                },
            {
                "q": "Can an officer appeal the final decision?",
                "a": "If the review is done by OMI, the officer has 14 days to appeal if they don't agree with the disciplinary plan. If they appeal, a hearing will be held within 14 days. After that hearing, a \"final decision\" will be issued. Despite the name, that decisions is <span class='font-italic'>not necessarily</span> final-- the disciplined officer can appeal the result. If they appeal the case moves into \"binding arbitration.\" At that point, designated arbitrators review the case and either uphold or overturn the disciplinary action.  Their decision is legally binding and cannot be appealed.<br/>If the review is done by CPRB and makes it past the public hearing, once the recommendation is given to the mayor and the chief the complaint is closed. If the officer wishes to appeal, they have to work that out with city offiicials rather than CPRB.",
                "c": result
                },
            ]

    for question in questions:
        q, was_created = Question.objects.get_or_create(q=question["q"], a=question["a"])
        q.save()
        q.category.set([question["c"]])
        q.save()

