#!/bin/bash

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Welcome Message
echo -e "${GREEN}************************************************************"
echo -e "                    Starting Backend Service"
echo -e "************************************************************${NC}"

# Step 1: Start Docker Compose services
echo -e "\n${GREEN}Step 1: Launching Docker Containers...${NC}"
docker-compose up -d
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Docker containers started successfully.${NC}"
else
    echo -e "${RED}Failed to start Docker containers. Exiting...${NC}"
    exit 1
fi

# Sleep for a few seconds to ensure that Docker services are fully up
sleep 5

# Step 2: Run Gradle bootRun
echo -e "\n${GREEN}Step 2: Running Gradle bootRun...${NC}"
gradle bootRun
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Gradle bootRun executed successfully.${NC}"
else
    echo -e "${RED}Gradle bootRun failed. Please check the logs above for details.${NC}"
    exit 1
fi

# Completion Message
echo -e "\n${GREEN}************************************************************"
echo -e "       Backend Service Started Successfully"
echo -e "************************************************************${NC}"
