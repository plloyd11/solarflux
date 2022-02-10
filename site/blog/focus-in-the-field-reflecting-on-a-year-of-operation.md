---
date: 2022-02-10
tags: blog
title: 'FOCUS in the field: reflecting on a year of operation'
featured_image: "/images/public/img_0866.jpg"
excerpt: In this blog post, we review the most recent 12 months of operational data
  from the FOCUS concentrator
category: Updates

---
Since 2016, the Solarflux team has operated a test FOCUS solar parabolic dish concentrator on Penn State University's Berks campus, just outside Philadelphia, Pennsylvania. While the operation of the concentrator has primarily focused on demonstrating its performance characteristics, the thermal energy collected is used to help heat a nearby greenhouse, thereby reducing its natural gas consumption.

In this blog post, we review the most recent 12 months of operational data from the FOCUS concentrator, spanning a period from February 2021 through January 2022, and discuss our experience operating it. Overall, the test concentrator’s performance during the past year has been highly successful, demonstrating reliable, maintenance-free operation and average solar-to-thermal conversion efficiency exceeding 70% across the period.

**Conversion Efficiency Performance**

Based on the data gathered during the 12-month period, the FOCUS collected approximately 9.0 MWh of thermal energy from 12.2 MWh of solar energy available to it, representing overall average solar-to-thermal conversion efficiency of 73%.![](/images/public/picture1.jpg)

The daily energy collected by the FOCUS concentrator during the period is shown in the chart below. The sensitivity of energy collection to available sunlight can be easily seen, with the peaks in collected energy being driven by days with strong availability of direct solar irradiance, and minimal energy collected on cloudy days. This highlights why it’s important to consider energy storage and/or a backup baseload energy source when evaluating solar energy solutions.

![](/images/public/picture2.png)

Cumulative energy collected over the period by the FOCUS test unit is shown in the below chart.

![](/images/public/picture3.png)

The annual average solar-to-thermal performance data corresponds well with both the optical models we've used in the design of the FOCUS, as well as the industry benchmark peak performance test we performed in June 2021. As we’ve shared previously, this test demonstrated peak solar-to-thermal efficiency for the FOCUS of 72%, was performed in accordance with ASTM 905-87, and the data and methods were independently reviewed and reported on by Lehigh University’s Energy Research Center.

The close alignment between the peak solar-to-thermal conversion efficiency of the FOCUS, as demonstrated by the June test, with the annual average solar-to-thermal collection efficiency shown above for the 12 months ended January 2022 is a result of the two-axis tracking capability of the FOCUS. Two axis tracking means the full reflective aperture of the FOCUS is always perfectly aligned with the sun, year-around. This is a unique feature of parabolic dish concentrators, and the primary reason why they are the most efficient of all solar energy technologies.

**Maintenance Requirements**

The FOCUS test unit operated fully autonomously for the 12-month period, automatically monitored using our proprietary SCADA platform. See below for an image of the SCADA dashboard. No maintenance was performed during the period aside from an experimental cleaning of the FOCUS concentrator’s reflective surface in June, which demonstrated minimal effect of cleaning on overall performance.

![](/images/public/picture4.png)

**Reflective Material Performance**

Until it was cleaned ahead of the June 2021 peak performance test, the FOCUS concentrator’s reflective aluminum had not been cleaned at all since installation in 2016, five years prior. Despite being located in an agricultural area, the reflective surface remained clear of any significant blemishes or dirt, and conversion performance was unaffected. Prior to the experimental cleaning, we performed a spectral reflectance test on a sample of the aluminum that had been exposed to the elements for five years. We then performed another test after the cleaning and, interestingly, the cleaning did not appear to have any material effect on the reflectivity of the aluminum. We hypothesize that the aluminum surface was naturally kept sufficiently clean by wind and rain, suggesting that, at least in locations with similar weather conditions, regular cleaning is not required for optimal performance of the FOCUS. This is encouraging support for its capacity for long-term maintenance-free operation in rugged, remote installations.

**Safety Performance**

The FOCUS employs several autonomously operated safety procedures, with the most important being wind-safe mode and heat-safe mode. Should wind speeds exceed pre-set thresholds, the FOCUS will move into a wind-safe position, with the receiver pointing up at the sky, thereby presenting its most aerodynamic profile to the wind. Similarly, should temperatures in the thermal loop exceed pre-set thresholds, the FOCUS will move the parabolic dish away from the sun and stop tracking until temperatures in the thermal loop have normalized. This prevents damage to the plumbing and equipment in the thermal loop.

During the 12-month observation period, there were 14 days in which the FOCUS automatically entered wind-safe mode due to windspeed exceeding the pre-set threshold (set at 35 mph, a conservative setting well below the design capability of the FOCUS). On several occasions the FOCUS did approach the threshold for heat-safe mode (105C in the test configuration), but it was not triggered at any time.

**Conclusion**

We are more than satisfied with the performance of the FOCUS field trial over the past 12 months, both in terms of demonstrating strong conversion efficiency consistent with our models, and that the FOCUS can be operated with minimal maintenance. The field trial has also provided a valuable proving ground for developing our SCADA platform. In the coming months we will build upon the experience we’ve gained during this trial and will conduct intensive field testing of our production candidate FOCUS concentrators as we prepare to ramp up production to meet growing market demand around the world.

_Notes on Methodology & Definitions_

We define solar-to-thermal conversion efficiency as the conversion of available sunlight (“incident energy”) into usable heat (“collected energy”), at the concentrator’s receiver. We measure incident energy using a pyrheliometer attached to the concentrator. The pyrheliometer records the amount of available direct beam solar radiation in kilowatt per meter squared. We then multiply the amount of solar radiation by the aperture of the reflective surface of the FOCUS concentrator, which is 14m2 to get total captured incident energy, measured in kilowatt (kW) optical. This is measured every 15 seconds through the day, and logged in our database. Collected energy is calculated by measuring the temperature of the thermal fluid circulating through the concentrator’s receiver, before and after it passes through the receiver. This information, combined with the mass flow rate of the fluid and its specific heat, permits calculation of the instantaneous amount of heat energy collected, also measured in kilowatt thermal. To get solar-to-thermal conversion efficiency, we then simply divide the amount of collected thermal energy by the incident optical energy for whatever time period we want to look at.