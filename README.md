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

![results calculated zoomed out](docs/general-view-desktop-calculated.png)

By pressing **Reset** button, you can restore the app to the initial state.

## Built with

- Semantic HTML5
- CSS + Flexbox
- Mobile-first workflow
- BEM naming convention
- RWD
- Vanilla JS

## Live website

[Here you can test live website](https://aviation4.github.io/Tip-calculator/)


## More Insights

### Inputs ###

All inputs are checked for data validity. When any of the entered values is incorrect, warning message is displayed and result values are set to zero.


The **Bill** value must be a positive number, not greater than 999 999. Typing the seventh digit is blocked:

![maximum number verification](/docs/bill/bill-max-number.png)

Typing a letter is blocked:

![letter verification](/docs/bill/bill-letter.png)

Typing a comma is blocked:

![comma verification](/docs/bill/bill-period.png)

Typing a dash/hyphen is blocked:

![negative number verification](/docs/bill/bill-negative.png)

When entering custom tip value in **Select Tip %** section, the only acceptable characters are numbers. Entering any other character causes the warning message to be displayed. Maximum tip percentage is 9999:

![maximum tip percentage](docs/tip-percentage/tip-percentage-custom-value-max.png)

When entering **Number Of People** value, the only acceptable characters are numbers. Entering any other character causes the warning message to be displayed. Maximum number is 999:

![maximum number of people](docs/number-of-people/number-of-people-max.png)

**As long as warning message is displayed, results are not calculated**


### Outputs ###

In order to fit into width of mobile devices, the result is displayed in the short form in some cases. When either **Tip amount** or **Total** value is *greater or equal to 1000 and lower than 1 000 000*, the result is expressed in thousands:

![results expressed in thousands](docs/results/results-thousands.png)

When either **Tip amount** or **Total** value is *greater than 1 000 000*, the result is expressed in millions:

![results expressed in millions](docs/results/results-millions.png)

Result value will not be greater than $101M, in accordance with input limitations.
