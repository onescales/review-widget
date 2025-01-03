# Review Widget To Show Off Trust
We had made a Free Review Widget to Show Off Your Reviews to (Hopefully) increase conversons on your site.

For our personal proejcts, we had pay $75-$100 / month for review widgets and couldn't find a cheaper solution. (note that there are paid solutions which also sync reviews and ask for reviews but there was no cheap solution for just showing reviews). 

So we built one you can use for free. Currently you have to list the reviews in a csv and it doesn't sync from review sites. Hope this helps you out there.

# How to Use

- Copy code from review-widget.js to your website - see url at https://github.com/onescales/review-widget/blob/main/review-widget.js
- On any page you want to embed the widget, just below the code shown. Also see below settings:

Settings and comments:
1) make sure to link the entire url of review-widget.js in <script src="review-widget.js"></script>
2) add your reviews to a csv (excel), save as reviews.csv and upload to your site.
make sure to add the following columns: (see example csv: https://github.com/onescales/review-widget/blob/main/reviews.csv )
- Name (name of reviewer)
- Stars (1-5 stars)
- on (which site you got the reviews from)
- date (date of review)

3) csvUrl: 'DOMAIN-URL/reviews.csv', (Place full url of review CSV you uploaded)
4) rotationSpeed (speed to rotate between reviews - 5000 = 5 seconds)
5) desktopAlignment (where to display on desktop)
6) minStars (show reviews from this number and above)
7) order (show reviews by order of list or random)
8) hideOnMobile (hide on mobile: yes or no)
9) initZIndex (z index - in case widget is behind other elements on page)


```
<script src="DOMAIN-URL/review-widget.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            ReviewWidget.init({
                csvUrl: 'DOMAIN-URL/reviews.csv', // Replace with your CSV file URL
                rotationSpeed: 5000, // rotation speed
                desktopAlignment: 'right', // Options: 'left', 'right', 'center'
                minStars: 4, // Only show reviews with 4 stars or above
                order: 'top-to-bottom', // Options: 'random' or 'top-to-bottom'
                hideOnMobile: 'no', // Options: 'yes' or 'no'
                initZIndex: 2147483647, // Custom z-index
            });
        });
    </script>
```


# Additional Notes
- All code and instructions are as is. By reading this repository, readme or any code, you acknowledge that you are solely responsible for your own doings.
- Link to website article with instructions: https://onescales.com/blogs/main/review-widget
- You should consider automating the reading/fetching of reviews to that this can be automatic. Consider zapier or similar apps.

Hope you liked this!

# Support Us / Donate
If this helped you in any way, please consider supporting us at https://onescales.com/pages/support-us

# Suggestions, Comments and Contact
If you have any suggestions, comments, insight or just want to say hi, thanks or share your experience, you can contact us at:
- Our WebSite: https://onescales.com/
- Contact Us: https://onescales.com/pages/contact
- Youtube Channel: https://www.youtube.com/@onescales
- Twitter/X: https://twitter.com/one_scales
- LinkedIn: https://www.linkedin.com/company/one-scales/







