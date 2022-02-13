# Tip calculator app

## Table of contents

- [Summary](#summary)
- [Usage](#usage)
- [Built with](#built-with)
- [Live website](#live-website)
- [More insights](#more-insights)


## Summary

This project is a solution to the [Tip calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX). The app allows to calculate:
+ tip amount
+ total bill value

based on three values:

+ bill value
+ tip percentage
+ number of people

**Mobile view:**

![mobile view](/docs/general-view-mobile.png)



**Desktop view:**

![desktop view](/docs/general-view-desktop.png)




## Usage

In order to calculate results, user must provide three values.


In the **Bill** section, enter the bill value, e.g.:

![bill section](docs/bill/bill.png)


In the **Select Tip %** section, you can choose either predefined value by pressing the corresponding button:

![tip button predefined](/docs/tip-percentage/tip-percentage-button-predefined.png)

or by passing the custom value, e.g.:

![custom tip value](/docs/tip-percentage/tip-percentage-custom-value.png)

In the **Number Of People** section, enter the number of people who share the bill, e.g.:

![number of people section](docs/number-of-people/number-of-people.png)


If entered data are correct, **Tip amount/person** and **Total/person** values are calculated:

![results calculated](docs/results/results.png)

![results calculated zoomed out](docs/general-view-mobile-calculated.png)

By pressing **Reset** button, you can restore the app to the initial state.

## Built with

- Semantic HTML5
- SCSS + Flexbox
- Mobile-first workflow
- BEM naming convention
- RWD
- Vanilla JS

## Live website

[Here you can test live website](https://aviation4.github.io/Tip-calculator/)


## More Insights

### Inputs ###

All inputs are checked for data validity. When any of the entered values is incorrect, warning message is displayed and result values are set to zero.


The entered data must be a positive number:

![positive verification](/docs/bill/bill-negative.png)

The entered number must be within the defined range:
- 9 999 999 for **Bill** value,
- 9999 for custom **Tip** value,
<<<<<<< HEAD
- 99 999 for **Number of People** value:

![maximum custom tip percentage verification](docs/tip-percentage/tip-percentage-custom-value-max.png)
=======
- 99 999 for **Number of People** value: 

![maximum tip percentage](docs/tip-percentage/tip-percentage-custom-value-max.png)
>>>>>>> 3c7f39ad46136922452d8c6c3529875367ab3a48

Additionally, for **Number of People** input, the given number must be an integer:

![whole number of people verification](docs/number-of-people/number-of-people-integer.png)

<<<<<<< HEAD
=======
Typing a dash/hyphen is blocked:

![negative number verification](/docs/bill/bill-negative.png)

When entering custom tip value in **Select Tip %** section, the only acceptable characters are numbers. Entering any other character causes the warning message to be displayed. Maximum tip percentage is 9999:



When entering **Number Of People** value, the only acceptable characters are numbers. Entering any other character causes the warning message to be displayed. Maximum number is 999:

![maximum number of people](docs/number-of-people/number-of-people-max.png)
>>>>>>> 3c7f39ad46136922452d8c6c3529875367ab3a48

**As long as warning message is displayed, results are not calculated**


### Outputs ###

In order to fit into width of mobile devices, the result is displayed in the short form in some cases. When either **Tip amount** or **Total** value is *greater or equal to 1000 and lower than 1 000 000*, the result is expressed in thousands:

![results expressed in thousands](docs/results/results-thousands.png)

When either **Tip amount** or **Total** value is *greater or equal to 1 000 000*, the result is expressed in millions:

![results expressed in millions](docs/results/results-millions.png)

Result value will not be greater than $101M, in accordance with input limitations.
