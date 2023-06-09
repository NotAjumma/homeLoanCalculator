function validateForm() {
  let u = document.forms["loanForm"]["input-monthly-income"].value;
  let selectElement = document.getElementById("input-select");
  let selectedIndex = selectElement.selectedIndex;
  let houseType = selectElement.value;
  let dateElement = document.getElementById("input-start-loan");
  let dateValue = dateElement.value;
  let w = document.forms["loanForm"]["input-age"].value;
  let xx = document.forms["loanForm"]["input-start-loan"].value;
  let x = document.forms["loanForm"]["input-loan"].value;
  let y = document.forms["loanForm"]["input-rate"].value;
  let z = document.forms["loanForm"]["input-years"].value;
  loan = x.replace(/,/g, "");
  monthlyIncome = u.replace(/,/g, "");

  if (loan == "") {
    alert("Loan Amount must be filled out.");
    return false;
  }

  if (loan < 50000) {
    alert("Your loan amount must be at least RM 50,000.");
    return false;
  }
  if (loan > 100000000) {
    alert("Your loan amount must be at least RM 100,000,000.");
    return false;
  }
  if (y == "") {
    alert("Interest Rate must be filled out.");
    return false;
  }
  if (y < 1) {
    alert("Your interest rate must be at less than 1%.");
    return false;
  }
  if (y > 12) {
    alert("Your interest rate must be less than 12%.");
    return false;
  }
  if (z == "") {
    alert("Loan Tenure must be filled out.");
    return false;
  }
  if (z < 5) {
    alert("Your loan tenure cannot be less than 5 years.");
    return false;
  }
  if (z > 35) {
    alert("Your loan tenure cannot be more than 35 years.");
    return false;
  }
  if (dateValue === "") {
    alert("Please select a start loan date.");
    return false;
  }
  if (w == "") {
    alert("Age must be filled out.");
    return false;
  }
  if (w < 18) {
    alert("Your age must cannot be less than 18 Years old.");
    return false;
  }
  if (w > 70) {
    alert("Your age cannot be more than 70 Years old.");
    return false;
  }
  if (selectedIndex === 0) {
    alert("Please select a house type.");
    return false;
  }
  if (monthlyIncome == "") {
    alert("Monthly Income must be filled out.");
    return false;
  }
  if (loan != "" && y != "" && z != "") {
    const years = document.getElementById("input-years").value;
    const additionalIncome = parseFloat(
      document.getElementById("input-additional-income").value.replace(",", "")
    );
    const monthlyIncome2 = parseFloat(
      document.getElementById("input-monthly-income").value.replace(",", "")
    );
    const age = parseFloat(document.getElementById("input-age").value);
    const year = parseFloat(document.getElementById("input-years").value);
    const rateFloat = parseFloat(y);
    var monthlyInterest = rateFloat / 12 / 100;
    var totalPayments = years * 12;
    var monthlyPayment = parseFloat(
      (
        (loan *
          monthlyInterest *
          Math.pow(1 + monthlyInterest, totalPayments)) /
        (Math.pow(1 + monthlyInterest, totalPayments) - 1)
      ).toFixed(2)
    );
    var totalInterest = parseFloat(
      monthlyPayment * totalPayments - loan
    ).toFixed(2);

    var startLoan = new Date(dateValue);
    var endLoan = new Date(startLoan);
    endLoan.setFullYear(endLoan.getFullYear() + year);
    var formattedEndLoan = endLoan.toDateString();
    var formattedStartLoan = startLoan.toDateString();

    var endAge = age + year;
    var newAdditionalIncome = additionalIncome || 0;

    var totalIncome = monthlyIncome2 + newAdditionalIncome;
    var monthlyIncomeAfterRepayment = (totalIncome - monthlyPayment).toFixed(2);

    var monthlyPrincipal = parseFloat(loan / totalPayments).toFixed(2);
    var monthlyInterest = parseFloat(totalInterest / totalPayments).toFixed(2);
    document.getElementById("monthly-repayment").innerHTML = monthlyPayment;
    document.getElementById("principal-value").innerHTML = monthlyPrincipal;
    document.getElementById("interest-value").innerHTML = monthlyInterest;
    document.getElementById("start-loan").innerHTML = formattedStartLoan;
    document.getElementById("end-loan").innerHTML = formattedEndLoan;
    document.getElementById("end-age").innerHTML = endAge;
    document.getElementById("house-type").innerHTML = houseType;
    document.getElementById("after-monthly-repayment").innerHTML =
      monthlyIncomeAfterRepayment;
    document.querySelector(".before-result").style.display = "none";
    document.querySelector(".after-result").style.display = "inline";

    // Get the progress element and label elements
    const progressElement = document.getElementById("progress");
    const labelBlueElement = document.getElementById("label-blue");
    const labelRedElement = document.getElementById("label-red");
    const labelMonthlyPaymentElement =
      document.getElementById("monthly-repayment");
    const labelMonthlyPrincipalElement =
      document.getElementById("principal-value");
    const labelMonthlyInterestElement =
      document.getElementById("interest-value");

    // Function to update the progress and labels with animation
    function updateProgress(blueAmount, redAmount, total) {
      const bluePercentage = parseFloat((blueAmount / total) * 100).toFixed(2);
      const redPercentage = parseFloat((redAmount / total) * 100).toFixed(2);

      // Animate the progress bar
      progressElement.style.width = "0%";
      setTimeout(() => {
        progressElement.style.width = `${bluePercentage}%`;
      }, 100);

      // Animate the labels
      animateLabelNumbers(0, bluePercentage, labelBlueElement);
      animateLabelNumbers(0, redPercentage, labelRedElement);
      animateLabelNumbersNoPercentage(
        0,
        monthlyPayment,
        labelMonthlyPaymentElement
      );
      animateLabelNumbersNoPercentage(
        0,
        monthlyPrincipal,
        labelMonthlyPrincipalElement
      );
      animateLabelNumbersNoPercentage(
        0,
        monthlyInterest,
        labelMonthlyInterestElement
      );
    }

    // Function to animate label numbers
    function animateLabelNumbers(startValue, endValue, labelElement) {
      const duration = 1000; // Animation duration in milliseconds
      const increment = (endValue - startValue) / (duration / 16); // Increment per frame (assumes 60fps)

      let currentValue = startValue;

      const animate = () => {
        currentValue += increment;

        if (currentValue <= endValue) {
          labelElement.textContent = Math.round(currentValue) + "%";
          requestAnimationFrame(animate);
        } else {
          labelElement.textContent = Math.round(endValue) + "%";
        }
      };

      animate();
    }

    function animateLabelNumbersNoPercentage(
      startValue,
      endValue,
      labelElement
    ) {
      const duration = 1000; // Animation duration in milliseconds
      const increment = (endValue - startValue) / (duration / 16); // Increment per frame (assumes 60fps)

      let currentValue = startValue;

      const animate = () => {
        currentValue += increment;

        if (currentValue <= endValue) {
          labelElement.textContent = currentValue.toFixed(2);
          requestAnimationFrame(animate);
        } else {
          labelElement.textContent = endValue.toFixed(2);
        }
      };

      animate();
    }

    // Example usage: update the progress using percentages for blue and red

    // Example usage: update the progress with new values after 3 seconds
    setTimeout(() => {
      updateProgress(monthlyPrincipal, monthlyInterest, monthlyPayment);
    }, 300);
    return false;
  }
}
document.addEventListener("DOMContentLoaded", function () {
  var today = new Date().toISOString().split("T")[0];
  document.getElementById("input-start-loan").setAttribute("min", today);
});
function formatNumber(input) {
  var value = input.value.replace(/,/g, ""); // Remove existing commas
  var formattedValue = addCommas(value); // Add commas

  input.value = formattedValue;
}

function addCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Only allow numeric input
$(document).ready(function () {
  $("#input-loan,#input-monthly-income,#input-additional-income").on(
    "input",
    function () {
      this.value = this.value.replace(/[^0-9,]/g, ""); // Remove non-numeric characters except commas
    }
  );
});
function validateInput(input) {
  // Remove any dots from the entered value
  input.value = input.value.replace(".", "");
}
// Include the navigation using JavaScript
fetch("components/navbar.html")
  .then((response) => response.text())
  .then((content) => {
    document.getElementById("navigation-placeholder").innerHTML = content;
  });

// Include the footer using JavaScript
fetch("components/footer.html")
  .then((response) => response.text())
  .then((content) => {
    document.getElementById("footer-placeholder").innerHTML = content;
  });

function copyProfileLink() {
  const linkText = document.getElementById("profileLink").getAttribute("value");

  // Create a temporary element
  const tempElement = document.createElement("textarea");
  tempElement.value = linkText;
  document.body.appendChild(tempElement);

  // Select and copy the link
  tempElement.select();
  document.execCommand("copy");

  // Clean up
  document.body.removeChild(tempElement);

  // Display a success message
  alert("Link copied to clipboard: " + linkText);
}
